import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/PrismaClient";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorised!" });
  }

  try {
    const anonymousPosts = await prisma.post.findMany({
      where: {
        category: "ANONYMOUS",
        userId: session?.user?.id,
      },
    });

    return NextResponse.json({
      message: "Post Fetched Succesfully!",
      anonymousPosts,
    });
  } catch (error) {
    console.log("Error in Feed Route", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
