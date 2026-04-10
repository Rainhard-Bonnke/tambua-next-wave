const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function updateAdminCredentials() {
  try {
    console.log('Updating admin credentials...');
    
    // First, create the user account
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: 'cresdynamics@gmail.com',
      password: 'Cresdynamic1234',
      email_confirm: true,
      user_metadata: {
        full_name: 'Admin User'
      }
    });

    if (authError && !authError.message.includes('already registered')) {
      throw authError;
    }

    const userId = authData.user?.id;

    if (userId) {
      // Update or create profile with admin role
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: userId,
          full_name: 'Admin User',
          role: 'admin',
          updated_at: new Date().toISOString()
        });

      if (profileError) throw profileError;
      
      console.log('Admin credentials updated successfully!');
      console.log('Email: cresdynamics@gmail.com');
      console.log('Password: Cresdynamic1234');
    } else {
      // User might already exist, find them and update role
      const { data: existingUser } = await supabase.auth.admin.listUsers();
      const adminUser = existingUser.users.find(u => u.email === 'cresdynamics@gmail.com');
      
      if (adminUser) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: adminUser.id,
            full_name: 'Admin User',
            role: 'admin',
            updated_at: new Date().toISOString()
          });
          
        if (profileError) throw profileError;
        console.log('Existing user updated with admin role!');
      }
    }
    
  } catch (error) {
    console.error('Error updating admin credentials:', error);
  }
}

updateAdminCredentials();
