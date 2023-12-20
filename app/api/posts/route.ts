import { getAuthSession } from "@/utils/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createHash } from "crypto";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 10;

  const query = {
    take: POST_PER_PAGE,
    skip: POST_PER_PAGE * (page ? parseInt(page) - 1 : 1),
    include: { user: true, cat: true },
    where: {
      ...(cat && { catSlug: cat }),
    },
    orderBy: {
      createdAt: "desc",
    },
  };

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page ? parseInt(page) - 1 : 1),
        include: { user: true, cat: true },
        where: {
          ...(cat && { catSlug: cat }),
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.post.count({ where: query.where }),
    ]);
    return new NextResponse(JSON.stringify({ posts, count }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(JSON.stringify({ message: "Not Authenticated!" }));
  }

  try {
    const body = await req.json();
    const uniqueSlug = generateUniqueSlug(body.title);
    const post = await prisma.post.create({
      data: { ...body, userEmail: session?.user?.email, slug: uniqueSlug },
    });

    return new NextResponse(JSON.stringify(post));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};

function generateUniqueSlug(projectName: string): string {
  const hashedValue = createHash("sha256").update(projectName).digest("hex");
  const shortHash = hashedValue.slice(0, 8);
  return `${projectName.replace(/\s+/g, "-")}-${shortHash}`;
}
