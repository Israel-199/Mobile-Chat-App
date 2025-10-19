import "dotenv/config";
import jwt from "jsonwebtoken";
import { Server as SocketIOServer ,Socket} from "socket.io";

export function initiailizeSocket(server:any):SocketIOServer{
    const io = new SocketIOServer(server,{
        cors:{
            origin:"*",
        }
    });

    io.use((socket:Socket,next)=>{
        const token = socket.handshake.auth.token;
        if(!token){
            return next(new Error("Authentication error: no token provided"));

        }

        jwt.verify(token,process.env.JWT_SECRET as string,(err:any,decoded:any)=>{
            if(err){
                return next(new Error("Authentication error: invalid token"));
            }

            let userData = decoded.user;
            socket.data= userData;
            socket.data.userId = userData.id;
            next();
    });
    });
  io.on("connection",async(socket:Socket)=>{
    const userId = socket.data.userId;
    console.log(`User connected: ${socket.data.userId}`);

    socket.on("disconnect",()=>{
        console.log(`User disconnected: ${userId}`);
    })
  });

    return io;
}