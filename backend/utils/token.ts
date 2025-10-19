import jwt from "jsonwebtoken";
import { UsersProps } from "../types";

export const generateToken = async (user:UsersProps)=>{
    const payload = {
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
            avatar:user.avatar
        }
    }
    return jwt.sign(payload,process.env.JWT_SECRET as string,{
        expiresIn:"30d"
    })
}