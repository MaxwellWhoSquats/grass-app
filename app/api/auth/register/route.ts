import { NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { z } from "zod";


const createUserSchema = z.object({
    email: z.string().min(1).max(255),
    password: z.string().min(8),
    });

export async function POST(request: Request) {
     
  try {
    const body = await request.json();
    
    const validation = createUserSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json({ error: validation.error.errors }, { status: 400 });

    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = await prisma.user.create({
        data: {
            email: body.email,
            password: hashedPassword,
        }
    });

    return NextResponse.json(newUser, { status: 201 });


  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ message: errorMessage }, { status: 400 });
  }
}
