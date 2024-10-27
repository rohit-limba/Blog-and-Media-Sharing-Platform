"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpForm from "@/components/Auth/signup";
import SignInForm from "@/components/Auth/signin";

const authPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Tabs defaultValue="signin" className="w-[600px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign-Up</TabsTrigger>
          <TabsTrigger value="signin">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <SignUpForm />
        </TabsContent>
        <TabsContent value="signin">
          <SignInForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default authPage;
