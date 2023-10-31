import { getAuthSession } from "@/utils/auth";
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

export const DELETE = async (req: NextRequest) => {
  try {
    const id = req.url.split("/posts/")[1];
    console.log(id);

    const result = prisma.post.delete({
      where: {
        id,
      },
    });
    console.log(result);

    return NextResponse.json(JSON.stringify(result));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
