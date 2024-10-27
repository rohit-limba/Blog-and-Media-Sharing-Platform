import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/PrismaClient";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorised!" });
  }

  try {
    await prisma.post.delete({
      where: {
        id: params.postId,
      },
    });

    return NextResponse.json({
      message: `Post with Id ${params.postId} deleted!`,
    });
  } catch (error) {
    console.log("Error in Deleting post", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
}
