import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/db";

// Define the schema
const createCustomerSchema = z.object({
    name: z.string().min(1).max(50),
    email: z.string().min(1).max(255),
    phone: z.string().min(1).max(14),
  });

export async function POST(request: NextRequest) {
    const body = await request.json();

    // Validate the request
    const validation = createCustomerSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json({ error: validation.error.errors }, { status: 400 });

    // Save the inventory item to the database
    const newCustomer = await prisma.customer.create({
        data: {
            name: body.name,
            email: body.email,
            phone: body.phone,
        }
    });

    return NextResponse.json(newCustomer, { status: 201 });
}