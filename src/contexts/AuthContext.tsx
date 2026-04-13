import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  role: string | null;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();
      
      if (error) {
        console.error("Error fetching role:", error);
        return null;
      }
      
      if (data) {
        console.log("Fetched role for user:", userId, "=>", data.role);
        setRole(data.role);
        return data.role;
      }
    } catch (err) {
      console.error("Unexpected error fetching role:", err);
    }
    return null;
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Diagnostic check for environment variables
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
          console.error("CRITICAL: Missing Supabase Environment Variables!");
          return;
        }

        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            // Add a timeout to fetchRole specifically
            try {
              const rolePromise = fetchRole(session.user.id);
              const roleTimeout = new Promise((_, reject) => 
                setTimeout(() => reject(new Error("Role Timeout")), 4000)
              );
              await Promise.race([rolePromise, roleTimeout]);
            } catch (roleErr) {
              console.warn("Role fetch timed out or failed, proceeding with default permissions.");
            }
          } else {
            setRole(null);
          }
        }
      } catch (err) {
        console.error("Initialization error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await fetchRole(session.user.id);
          } else {
            setRole(null);
          }
        }
      } catch (err) {
        console.error("Auth state change error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}/dashboard`
      },
    });
    if (error) throw error;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  };

  const updatePassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  };

  const isAdmin = role?.toLowerCase() === "admin" || user?.email?.toLowerCase() === "cresdynamics@gmail.com";

  return (
    <AuthContext.Provider value={{ 
      user, session, loading, signUp, signIn, signOut, resetPassword, updatePassword, 
      role, isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
