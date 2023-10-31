import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const GET = async () => {
  try {
    const users = await prisma.user.findMany();

    return new NextResponse(JSON.stringify(users));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
