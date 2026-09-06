import { Router } from "express";
import {
  getOrCreateConversation,
  getUserConversations,
  getConversationMessages,
  sendMessage,
} from "../controllers/chat.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/conversation", authMiddleware, getOrCreateConversation);
router.get("/conversations", authMiddleware, getUserConversations);
router.get("/messages/:conversationId", authMiddleware, getConversationMessages);
router.post("/messages", authMiddleware, sendMessage);

export default router;
