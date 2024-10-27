"use client";

import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupFormSchema } from "@/FormSchemas/SignUpForm";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState, useTransition } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DotLoader } from "react-spinners";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function signupSubmit(values: z.infer<typeof signupFormSchema>) {
    const { username, email, password } = values;

    const payload = {
      username,
      email,
      password,
    };

    startTransition(async () => {
      try {
        const response = await axios.post("/api/signup", payload);
        toast({
          variant: "default",
          title: `${response.data.message}`,
        });
        router.push("/auth");
        router.refresh();
      } catch (error: any) {
        console.log("Error : ", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        signupForm.reset();
      }
    });
  }

  if (isPending) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <DotLoader color="#4A96FF" size={90} speedMultiplier={1} />
      </div>
    );
  }

  return (
    <Card className="bg-secondary">
      <CardHeader className="mb-6">
        <CardTitle className="flex flex-col items-center justify-center space-y-2">
          <p className="text-primary/30 text-sm font-semibold">Sign Up</p>
          <p>Create an account to continue</p>
        </CardTitle>
      </CardHeader>
      <Form {...signupForm}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            signupForm.handleSubmit(signupSubmit)();
          }}
        >
          <div className="space-y-2">
            <CardContent>
              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Choose a preferred username"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal">Password</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-1">
                        <Input
                          placeholder="Choose a strong Password"
                          {...field}
                          type={showPassword ? "text" : "password"}
                          disabled={isPending}
                        />
                        <Button
                          type="button"
                          size={"icon"}
                          variant={"ghost"}
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                          disabled={isPending}
                        >
                          {showPassword && <Eye />}
                          {!showPassword && <EyeOff />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={isPending}
                variant={"primary"}
              >
                Create Account
              </Button>
            </CardFooter>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default SignUpForm;
