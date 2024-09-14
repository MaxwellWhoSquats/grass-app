import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        title: true,
        email: true,
      },
    });

    return NextResponse.json(users);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching users:", errorMessage);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
