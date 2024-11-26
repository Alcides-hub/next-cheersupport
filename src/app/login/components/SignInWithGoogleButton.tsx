// components/SignInWithGoogleButton.tsx

'use client';

import { supabase } from '@/src/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function SignInWithGoogleButton() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      console.error('Google Sign-In error:', error);
      router.push('/error');
    }
  };

  return (
    <Button type="button" variant="outline" onClick={handleGoogleSignIn}>
      Login with Google
    </Button>
  );
}
