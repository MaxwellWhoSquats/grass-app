import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { z } from 'zod';

const sendMessageSchema = z.object({
    content: z.string().min(1),
  });
  
  export async function POST(
    request: NextRequest,
    { params }: { params: { conversationId: string } }
  ) {
    const session = await getServerSession(authOptions);
  
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  
    const userId = Number(session.user.id);
    const conversationId = parseInt(params.conversationId, 10);
  
    try {
      const body = await request.json();
      const validation = sendMessageSchema.safeParse(body);
  
      if (!validation.success) {
        return NextResponse.json(
          { error: validation.error.errors },
          { status: 400 }
        );
      }
  
      const { content } = validation.data;
  
      // Verify that the user is part of the conversation
      const conversation = await prisma.conversation.findFirst({
        where: {
          id: conversationId,
          OR: [{ user1Id: userId }, { user2Id: userId }],
        },
      });
  
      if (!conversation) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
      }
  
      // Create message
      const message = await prisma.message.create({
        data: {
          content,
          senderId: userId,
          conversationId,
        },
      });
  
      return NextResponse.json(message);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Error sending message:', errorMessage);
      return NextResponse.json({ message: errorMessage }, { status: 500 });
    }
}






export async function GET(
  request: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = Number(session.user.id);
  const conversationId = parseInt(params.conversationId, 10);

  try {
    // Verify that the user is part of the conversation
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: conversationId,
        OR: [{ user1Id: userId }, { user2Id: userId }],
      },
    });

    if (!conversation) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Fetch messages
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(messages);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error fetching messages:', errorMessage);
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
