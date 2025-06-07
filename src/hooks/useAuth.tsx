import {useState, useEffect, useContext, createContext} from 'react';
import axios from "axios";

export type User = {
    email : string;
    name: string;
    id: number;
}

export type SignUpReq = {
    email: string;
    password: string;
    name: string;
}

export type SignUpRes = User & { message: string; }

export type LoginReq = {
    email: string;
    password: string;
}

export type LoginRes = SignUpRes


interface AuthContextProps {
    isLoading: boolean;
    signUp: (req : SignUpReq) => Promise<User>;
    login: (req : LoginReq) => Promise<User>;
    loginByOAuth : (provider: "google" | "kakao") => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context
}

export const AuthProvider: React.FC = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);

    const signUp = async (req : SignUpReq) : Promise<User> => {
        setIsLoading(true);
        try {
            const res = await axios.post("/api/auth/signup", req)
            if(res.status !== 200) {
                throw new Error("Sign up failed with status: " + res.status);
            }

            const {email, name, id} : User = res.data as SignUpRes;
            return {email, name, id}
        } catch (error) {
            console.error("Sign up failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const login = async (req : LoginReq) : Promise<User> => {
        setIsLoading(true);
        try {
            const res = await axios.post("/api/auth/login", req)
            if(res.status !== 200) {
                throw new Error("Login failed with status: " + res.status);
            }
            const {email, name, id} : User = res.data as LoginRes;
            return {email, name, id}
        } catch (error) {
            console.error("Sign up failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const loginByOAuth = async (provider: "google" | "kakao") => {
        setIsLoading(true);
        try {
            const res = await axios.get(`/oauth2/authorization/${provider}`)
            console.log(res)
        } catch (error) {
            console.error("login by auth failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{isLoading, signUp, login, loginByOAuth}}>
            {children}
        </AuthContext.Provider>
    )
}