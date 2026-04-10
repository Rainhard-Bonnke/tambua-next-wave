import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase env vars");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testLatency() {
  console.log("Testing Supabase latency...");
  const start = Date.now();
  try {
    const { data, error } = await supabase.from('safaris').select('id').limit(1);
    const end = Date.now();
    if (error) {
      console.error("Fetch error:", error);
    } else {
      console.log(`Latency: ${end - start}ms`);
    }
  } catch (err) {
    console.error("Test failed:", err);
  }
}

testLatency();
