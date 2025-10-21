import { login, register } from "@/service/authService";
import { AuthContextProps, DecodedTokenProps } from "@/types";
import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connectSocket, disconnectSocket } from "@/socket/socket";

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
  updateToken: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const loadToken = async ()=>{
    const storedToken = await AsyncStorage.getItem("token");
    if(storedToken){
      try {
        const decoded = jwtDecode<DecodedTokenProps>(storedToken);
        if(decoded.exp && decoded.exp < Date.now()/ 1000){
             await AsyncStorage.removeItem("token");
             getWelcomePage();
             return;
        }

        setToken(storedToken);
         await connectSocket();
        setUser(decoded.user);

        getHomePage();
      } catch (error) {
        getWelcomePage();
        console.log("faild to decode token ",error);
      }
    }else{
      getWelcomePage();
    }
  }

   useEffect(()=>{
    loadToken();
  },[])

  const getHomePage = ()=>{
   setTimeout(()=>{
     router.replace("/(main)/home");
   },1500)
  }

  const getWelcomePage = ()=>{
   setTimeout(()=>{
     router.replace("/(auth)/welcome");
   },1500)
  }

  const updateToken = async (newToken: string | null) => {
    if (newToken) {
      setToken(newToken);
      await AsyncStorage.setItem("authToken", newToken);

      const decoded = jwtDecode<DecodedTokenProps>(newToken);
      setUser(decoded.user);
    }
  };

  const signIn = async (email: string, password: string) => {
    const response = await login(email, password);
    await updateToken(response.token);
    await connectSocket();
    router.replace("/(main)/home");
  };

  const signUp = async (email: string, password: string, name: string, avatar?: string | null) => {
    const response = await register(email, password, name, avatar);
    await updateToken(response.token);
     await connectSocket();
    router.replace("/(main)/home");
  };

  const signOut = async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem("authToken");
    disconnectSocket();
    router.replace("/(auth)/welcome");
  };

  return (
    <AuthContext.Provider value={{ token, user, signIn, signOut, signUp, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
