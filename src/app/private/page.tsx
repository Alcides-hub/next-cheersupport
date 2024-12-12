import { redirect } from 'next/navigation'
import { supabase } from '../../lib/supabase/server';


console.log(supabase); 
export default async function PrivatePage() {
  const { auth } = supabase;


  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return <p>Hello {data.user.email}</p>
}