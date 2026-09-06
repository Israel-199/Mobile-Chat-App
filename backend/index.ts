import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import { initiailizeSocket } from "./socket/socket";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Server starts.....");
});

// Create HTTP server from Express app
const server = http.createServer(app);

// Initialize Socket.IO with HTTP server
initiailizeSocket(server);

// Start server
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running at ${PORT} port`);
});
