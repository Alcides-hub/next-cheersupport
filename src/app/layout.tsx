'use client';

import '@/src/app/globals.css';
import { Header } from '../../components/shared/Header';
import { useEffect, useState } from 'react';
import { supabase } from '@/src/lib/supabase/client';
import { ThemeProvider } from "@/src/app/theme-provider"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem('supabase.auth.token');
      if (storedToken) {
        const session = JSON.parse(storedToken);
        console.log('Restoring session from LocalStorage:', session);
  
        const { error } = await supabase.auth.setSession({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        });
  
        if (error) {
          console.error('Error restoring session:', error.message);
          setIsLoggedIn(false);
        } else {
          console.log('Session restored successfully.');
          setIsLoggedIn(true);
        }
      } else {
        console.log('No session found in LocalStorage.');
        setIsLoggedIn(false);
      }
    };
  
    restoreSession();
  
    // Listen for authentication state changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', session);
  
      if (session) {
        localStorage.setItem('supabase.auth.token', JSON.stringify(session));
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('supabase.auth.token');
        setIsLoggedIn(false);
      }
    });
  
    console.log('Subscription object:', subscription);
  
    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      } else {
        console.warn('Subscription cleanup failed: no valid unsubscribe method.');
      }
    };
  }, []);
  

  return (
    <html lang="en">
      <body className="min-h-screen">
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Header />
        {/* Always render children */}
        <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
