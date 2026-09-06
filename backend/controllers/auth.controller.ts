import { Request, Response } from "express";
import { prisma } from "../config/db";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token";

export const registerUser = async (req: Request, res: Response) => {
    const { email, name, avatar, password } = req.body;

    try {
        let existingUser = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (existingUser) {
            return res.status(400).json({ success: false, msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: {
                email: email.toLowerCase(),
                password: hashedPassword,
                name,
                avatar: avatar || "",
            }
        });

        const token = generateToken(newUser);

        res.json({
            success: true,
            token,
        });

    } catch (error) {
        console.log("error:", error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        if (!user) {
            return res.status(400).json({ success: false, msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, msg: "Invalid credentials" });
        }

        const token = generateToken(user);

        res.json({
            success: true,
            token,
        });

    } catch (error) {
        console.log("error:", error);
        res.status(500).json({ success: false, msg: "Server Error" });
    }
};