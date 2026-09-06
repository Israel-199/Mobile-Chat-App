import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    name?: string;
    email?: string;
    avatar?: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "") || req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ success: false, msg: "No token, authorization denied" });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ success: false, msg: "Token is invalid or expired" });
  }
};
