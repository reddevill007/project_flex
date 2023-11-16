import { getAuthSession } from "@/utils/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q");

  try {
    const posts = await prisma.post.findMany({
      include: { user: true, cat: true },
      where: {
        OR: [
          {
            title: {
              contains: q ? q : "",
              mode: "insensitive", // case-insensitive search
            },
          },
          {
            desc: {
              contains: q ? q : "",
              mode: "insensitive", // case-insensitive search
            },
          },
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return new NextResponse(JSON.stringify({ posts }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  } finally {
    await prisma.$disconnect();
  }
};
