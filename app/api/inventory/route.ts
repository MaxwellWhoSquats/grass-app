import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/prisma/db';


const inventorySchema = z.object({
  rollNumber: z.string().min(1, "Roll number is required"),
  productId: z.number().int().positive("Product ID must be a positive integer"),
  width: z.number().int().positive("Width must be a positive integer"),
  length: z.number().int().positive("Length must be a positive integer"),
});

export async function GET(req: NextRequest) {
  try {
    const inventoryItems = await prisma.inventory.findMany({
      include: {
        product: {
          select: {
            name: true,
          },
        },
      },
    });

    // Format the response to include the product name
    const formattedItems = inventoryItems.map(item => ({
      id: item.id,
      rollNumber: item.rollNumber,
      productName: item.product.name,
      width: item.width,
      length: item.length,
      createdAt: item.createdAt,
    }));

    return NextResponse.json(formattedItems, { status: 200 });
  } catch (error) {
    console.error("GET /api/inventory error:", error);
    return NextResponse.json(
      { error: 'Failed to fetch inventory items.' },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      const validation = inventorySchema.parse(body);
  
      // Create a new inventory item
      const newInventory = await prisma.inventory.create({
        data: {
          rollNumber: validation.rollNumber,
          productId: validation.productId,
          width: validation.width,
          length: validation.length,
        },
      });
  
      return NextResponse.json(newInventory, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to create inventory item.' },
        { status: 500 }
      );
    }
  }
