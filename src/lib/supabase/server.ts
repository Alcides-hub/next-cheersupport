import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Ensure environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase environment variables are not set');
}

console.log("Supabase client initialized");
// Export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
