import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: any }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.update({
      where: { slug: slug },
      data: { views: { increment: 1 } },
      include: { user: true },
    });

    return new NextResponse(JSON.stringify(post));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
