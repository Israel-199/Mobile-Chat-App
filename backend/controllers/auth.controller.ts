import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token";


export const registerUser = async (req:Request,res:Response)=>{
    
    const {email,name,avatar,password} = req.body;

    try {
        let user = await User.findOne({email});

        if(user) {
            return res.status(400).json({success:false,msg:"User already exists"});
        }

       const newUser= new User({
            email,
            password,
            name,
            avatar: avatar||"",
        });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password,salt);

    await newUser.save();

    const token = generateToken(newUser);

    res.json({
        success:true,
        token,
    })

    } catch (error) {
        console.log("error:",error);
        res.status(500).json({success:false,msg:"Server Error"});
    }
}

export const loginUser = async (req:Request,res:Response)=>{
    
    const {email,password} = req.body;

    try {
       
        const user = await User.findOne({email});

        if(!user){
           return res.status(400).json({success:false, msg:"Invalid credentials"})
        }

        const isMatch= await bcrypt.compare(password,user.password);

        if(!isMatch){
             return res.status(400).json({success:false, msg:"Invalid credentials"})
        }

        const token = generateToken(user);

    res.json({
        success:true,
        token,
    });

    } catch (error) {
        console.log("error:",error);
        res.status(500).json({success:false,msg:"Server Error"});
    }
}