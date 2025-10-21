import { API_URL } from "@/constants";
import axios from "axios";

export const login = async (email: string, password: string): Promise<{ token: string }> => {
   try {
    const reponse = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
    });
    return Response.data;
   } catch (error:any) {
     console.log("Login error:", error);
     const msg = error.response?.data?.message || "An error occurred during login.";
     throw new Error(msg);
   }
}


export const register = async (email: string, password: string,name:string,avatar?:string|null): Promise<{ token: string }> => {
   try {
    const reponse = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        name,
        avatar,
    });
    return Response.data;
   } catch (error:any) {
     console.log("Login error:", error);
     const msg = error.response?.data?.message || "An error occurred during register.";
     throw new Error(msg);
   }
}