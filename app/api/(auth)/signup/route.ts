import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/PrismaClient";
import { generateHash } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, username, password } = body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
      username,
    },
  });

  if (existingUser) {
    return NextResponse.json({
      message: "User Already Exists with provided username/email",
    });
  }

  const passwordHash = await generateHash(password);

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: passwordHash,
    },
  });

  return NextResponse.json({ message: "User Created Succesfully!" });
}
