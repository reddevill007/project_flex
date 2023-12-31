import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { log } from "console";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: any }) => {
  const { slug } = params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: slug },
      include: {
        Post: true,
        Comments: {
          include: {
            user: true,
            post: {
              include: { user: true },
            },
          },
        },
        Like: true,
      },
    });

    return new NextResponse(JSON.stringify(user));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
