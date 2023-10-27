import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const orderedPosts = await prisma.post.findMany({
      take: 1,
      orderBy: [{ views: "desc" }],
      include: { cat: true, user: true },
    });
    return new NextResponse(JSON.stringify(orderedPosts));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
