'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
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
import { SignInButton } from "@clerk/nextjs";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const { isLoaded, signIn } = useSignIn();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      setErrorMessage("Authentication service is not loaded yet.");
      return;
    }

    try {
      // Email and password sign-in
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        console.log("Login success.");
        router.push("/profile"); // Redirect to your profile page
      } else {
        setErrorMessage("Authentication incomplete. Please try again.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setErrorMessage(error.errors?.[0]?.message || "An error occurred during login.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center px-4">
      <Card className="max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email and password to log in or use Google/LINE.
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
            </div>
          </form>
          <div className="mt-4 grid gap-2">
            {/* Sign in with Google */}
            <SignInButton mode="redirect" >
                <Button variant="outline" className="w-full">
                  Sign in with Google
                </Button>
              </SignInButton>

              {/* Sign in with LINE */}
              <SignInButton mode="redirect">
                <Button variant="outline" className="w-full">
                  Sign in with LINE
                </Button>
              </SignInButton>
          </div>
          {errorMessage && (
            <div className="mt-2 text-center text-red-500">{errorMessage}</div>
          )}
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
