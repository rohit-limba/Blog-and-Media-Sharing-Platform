import { NextRequest, NextResponse } from "next/server";
import { postFormSchema } from "@/FormSchemas/CreatePostForm";
import prisma from "@/prisma/PrismaClient";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { success } = postFormSchema.safeParse(body);

  if (!success) {
    return NextResponse.json({
      message: "Invalid data feilds",
    });
  }

  const { content, userId, category, src } = body;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "Unauthorized!" });
  }

  try {
    const post = await prisma.post.create({
      data: {
        content,
        userId,
        category,
        src,
        username: user?.username!,
      },
    });

    return NextResponse.json({ message: "Post Created Succesfully!", post });
  } catch (error) {
    console.log("Error in Post Route", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
