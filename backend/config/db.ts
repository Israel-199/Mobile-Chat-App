import mongoose from "mongoose";
import "dotenv/config";

const connectDB=async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("mongodb connection error",error);
        throw error
    }
}

export default connectDB;