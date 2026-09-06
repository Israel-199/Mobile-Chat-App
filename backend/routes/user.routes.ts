import { Router } from "express";
import { searchUsers, getMe } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/search", authMiddleware, searchUsers);
router.get("/me", authMiddleware, getMe);

export default router;
