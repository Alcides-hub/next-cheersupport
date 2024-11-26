'use client'
// components/LoginForm.tsx

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/src/lib/supabase/client"; // Ensure this points to your supabase client
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SignInWithGoogleButton from "./SignInWithGoogleButton";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Attempt to sign in with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Log the response from Supabase
      if (error) {
        console.error("Login error:", error.message);
        setErrorMessage(error.message); // Display error to the user
        return;
      }

      console.log("Login success. Session data:", data);

      // Fetch the session after login to confirm it is set
      const { data: sessionData } = await supabase.auth.getSession();
      console.log("Session after login:", sessionData);

      // Debug localStorage to confirm session tokens are stored
      const localStorageData = localStorage.getItem("supabase.auth.token");
      console.log("LocalStorage Supabase Token after login:", localStorageData);

      setErrorMessage(""); // Clear any previous error
      alert("Login successful!"); // Optional: Provide feedback to the user
    } catch (error: any) {
      console.error("Error during handleLogin:", error);
      setErrorMessage(error.message || "An error occurred during login.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center px-4">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <SignInWithGoogleButton />
            </div>
          </form>
          {errorMessage && (
            <div className="mt-2 text-center text-red-500">{errorMessage}</div>
          )}
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
