import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../config/db";

// Get or Create direct conversation between current user and target user
export const getOrCreateConversation = async (req: AuthRequest, res: Response) => {
  const currentUserId = req.user?.id;
  const { participantId } = req.body;

  if (!currentUserId || !participantId) {
    return res.status(400).json({ success: false, msg: "Participant ID is required" });
  }

  try {
    // Find existing direct conversation with both participants
    const existingConversations = await prisma.conversation.findMany({
      where: {
        type: "direct",
        AND: [
          { participants: { some: { userId: currentUserId } } },
          { participants: { some: { userId: participantId } } },
        ],
      },
      include: {
        participants: {
          include: {
            user: {
              select: { id: true, name: true, email: true, avatar: true },
            },
          },
        },
        lastMessage: {
          include: {
            sender: { select: { id: true, name: true, avatar: true } },
          },
        },
      },
    });

    if (existingConversations.length > 0) {
      return res.json({ success: true, conversation: existingConversations[0] });
    }

    // Create new direct conversation
    const newConversation = await prisma.conversation.create({
      data: {
        type: "direct",
        createdById: currentUserId,
        participants: {
          create: [
            { userId: currentUserId },
            { userId: participantId },
          ],
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: { id: true, name: true, email: true, avatar: true },
            },
          },
        },
        lastMessage: true,
      },
    });

    res.json({ success: true, conversation: newConversation });
  } catch (error) {
    console.error("GetOrCreateConversation error:", error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

// Get all user conversations
export const getUserConversations = async (req: AuthRequest, res: Response) => {
  const currentUserId = req.user?.id;

  if (!currentUserId) {
    return res.status(401).json({ success: false, msg: "Unauthorized" });
  }

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        participants: {
          some: { userId: currentUserId },
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: { id: true, name: true, email: true, avatar: true },
            },
          },
        },
        lastMessage: {
          include: {
            sender: { select: { id: true, name: true, avatar: true } },
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.json({ success: true, conversations });
  } catch (error) {
    console.error("GetUserConversations error:", error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

// Get messages for a conversation
export const getConversationMessages = async (req: AuthRequest, res: Response) => {
  const { conversationId } = req.params;

  try {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: {
        sender: {
          select: { id: true, name: true, avatar: true, email: true },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    res.json({ success: true, messages });
  } catch (error) {
    console.error("GetConversationMessages error:", error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

// Post a message via REST
export const sendMessage = async (req: AuthRequest, res: Response) => {
  const currentUserId = req.user?.id;
  const { conversationId, content, type, attachment } = req.body;

  if (!currentUserId || !conversationId || !content) {
    return res.status(400).json({ success: false, msg: "Missing required fields" });
  }

  try {
    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId: currentUserId,
        content,
        type: type || "text",
        attachment: attachment || null,
      },
      include: {
        sender: {
          select: { id: true, name: true, avatar: true, email: true },
        },
      },
    });

    // Update conversation lastMessageId and updatedAt timestamp
    await prisma.conversation.update({
      where: { id: conversationId },
      data: {
        lastMessageId: message.id,
        updatedAt: new Date(),
      },
    });

    res.json({ success: true, message });
  } catch (error) {
    console.error("SendMessage error:", error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};
