import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/PrismaClient";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorised!" });
  }
  try {
    const nonanonymousPosts = await prisma.post.findMany({
      where: {
        category: "NON_ANONYMOUS",
        userId: session?.user?.id,
      },
    });

    return NextResponse.json({
      message: "Post Fetched Succesfully!",
      nonanonymousPosts,
    });
  } catch (error) {
    console.log("Error in Feed Route", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
