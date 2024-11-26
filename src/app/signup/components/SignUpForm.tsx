import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "@/src/app/action";

export default function SignUpForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={signup} method="post">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first-name">First name</Label>
                <Input name="first-name" id="first-name" required />
              </div>
              <div>
                <Label htmlFor="last-name">Last name</Label>
                <Input name="last-name" id="last-name" required />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input name="email" id="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input name="password" id="password" type="password" required />
            </div>
            <Button type="submit">Create an account</Button>
          </div>
        </form>
        <div className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

