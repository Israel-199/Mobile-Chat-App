import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes"

const PORT =process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth",authRoutes);

app.get("/",(req,res)=>{
    res.send("Server starts.....");
});

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running at ${PORT} port`);
})
