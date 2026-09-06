import { PrismaClient } from "@prisma/client";
import "dotenv/config";

export const prisma = new PrismaClient();

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("MySQL Database Connected via Prisma");
    } catch (error) {
        console.log("MySQL connection error", error);
        throw error;
    }
};

export default connectDB;