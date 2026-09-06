import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../config/db";

export const searchUsers = async (req: AuthRequest, res: Response) => {
  try {
    const query = (req.query.q as string) || "";
    const currentUserId = req.user?.id;

    const users = await prisma.user.findMany({
      where: {
        AND: [
          currentUserId ? { id: { not: currentUserId } } : {},
          {
            OR: [
              { name: { contains: query } },
              { email: { contains: query } },
            ],
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
      },
      take: 20,
    });

    res.json({ success: true, users });
  } catch (error) {
    console.error("Search users error:", error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({ success: false, msg: "Server Error" });
  }
};
