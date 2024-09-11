import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const {email, password} = await request.json();

    if (!email || !password) {
        return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
      }

    return NextResponse.json({ email, password });


  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
