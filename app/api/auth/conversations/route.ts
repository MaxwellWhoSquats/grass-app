import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { z } from 'zod';

const startConversationSchema = z.object({
  userId: z.number().int().positive(),
});

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = Number(session.user.id);;

  try {
    const body = await request.json();
    const validation = startConversationSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }

    const { userId: otherUserId } = validation.data;

    if (userId === otherUserId) {
      return NextResponse.json(
        { error: 'Cannot start a conversation with yourself' },
        { status: 400 }
      );
    }

    // Check if conversation already exists
    let conversation = await prisma.conversation.findFirst({
      where: {
        OR: [
          { user1Id: userId, user2Id: otherUserId },
          { user1Id: otherUserId, user2Id: userId },
        ],
      },
    });

    if (!conversation) {
      // Create new conversation
      conversation = await prisma.conversation.create({
        data: {
          user1Id: userId,
          user2Id: otherUserId,
        },
      });
    }

    return NextResponse.json(conversation);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error starting conversation:', errorMessage);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}




export async function GET(request: NextRequest) {
    const session = await getServerSession(authOptions);
  
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  
    const userId = Number(session.user.id);
  
    try {
      const conversations = await prisma.conversation.findMany({
        where: {
          OR: [{ user1Id: userId }, { user2Id: userId }],
        },
        include: {
          user1: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              title: true,
            },
          },
          user2: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              title: true,
            },
          },
          messages: {
            orderBy: { createdAt: 'desc' },
            take: 1, // Get the latest message
          },
        },
      });
  
      return NextResponse.json(conversations);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error fetching conversations:', errorMessage);
      return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}
