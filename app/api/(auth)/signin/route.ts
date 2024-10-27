import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/auth";
import { loginFormSchema } from "@/FormSchemas/SignInForm";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { success } = loginFormSchema.safeParse(body);
  if (!success) {
    return NextResponse.json({
      message: "Invalid daata feilds",
    });
  }

  const { username, password } = body;

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/",
    });
    return NextResponse.json({ message: "Login Successful!" });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
