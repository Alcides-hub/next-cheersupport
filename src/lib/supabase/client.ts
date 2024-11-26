import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  {
    auth: {
      persistSession: true, // Ensure session persistence
      autoRefreshToken: true, // Automatically refresh expired tokens
    },
  }
);

console.log("Supabase Client Config:", supabase);


supabase.auth.getSession().then(({ data: { session } }) => {
  console.log("Session:", session);
}).catch((error) => {
  console.error("Error fetching session:", error);
});