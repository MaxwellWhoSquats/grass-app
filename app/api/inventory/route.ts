import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/db";

// Define the schema
const createInventorySchema = z.object({
    rollNumber: z.string().min(1).max(6),
    productId: z.number().int(),
    width: z.number().min(1).max(15),
    length: z.number().min(1).max(100)
  });

export async function POST(request: NextRequest) {
    const body = await request.json();

    // Validate the request
    const validation = createInventorySchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json({ error: validation.error.errors }, { status: 400 });

    // Save the inventory item to the database
    const newInventoryItem = await prisma.inventory.create({
        data: {
            rollNumber: body.rollNumber,
            productId: body.productId,
            width: body.width,
            length: body.length
        }
    });

    return NextResponse.json(newInventoryItem, { status: 201 });
}