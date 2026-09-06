import { Socket, Server as SocketIOServer } from "socket.io";
import { prisma } from "../config/db";

export function registerUserEvents(io: SocketIOServer, socket: Socket) {
  socket.on("testSocket", (data) => {
    socket.emit("testSocketResponse", { message: "Socket connection successful", data });
  });

  socket.on("joinConversation", (conversationId: string) => {
    socket.join(`conversation_${conversationId}`);
    console.log(`Socket ${socket.id} joined room conversation_${conversationId}`);
  });

  socket.on("leaveConversation", (conversationId: string) => {
    socket.leave(`conversation_${conversationId}`);
    console.log(`Socket ${socket.id} left room conversation_${conversationId}`);
  });

  socket.on("sendMessage", async (data: { conversationId: string; content: string; type?: string; attachment?: string }) => {
    const senderId = socket.data.userId;
    const { conversationId, content, type, attachment } = data;

    if (!senderId || !conversationId || !content) return;

    try {
      const message = await prisma.message.create({
        data: {
          conversationId,
          senderId,
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

      await prisma.conversation.update({
        where: { id: conversationId },
        data: {
          lastMessageId: message.id,
          updatedAt: new Date(),
        },
      });

      // Emit new message to all clients in the conversation room
      io.to(`conversation_${conversationId}`).emit("newMessage", message);
    } catch (error) {
      console.error("Socket sendMessage error:", error);
    }
  });
}