import {createContext, useContext, useState} from 'react';
import type {ReactNode} from 'react';
import axios from "axios";
import {LoginReq, LoginRes, SignUpReq, SignUpRes, User} from "../type/auth";
import {c} from "vite/dist/node/moduleRunnerTransport.d-DJ_mE5sf";


interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextProps {
    isLoading: boolean;
    user: User | null;

    signUp: (req: SignUpReq) => Promise<User>;
    login: (req: LoginReq) => Promise<User>;
    loginByOAuth: (provider: "google" | "kakao") => Promise<void>;
    setRedirectUrl: (url: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider: React.FC = ({children}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const signUp = async (req: SignUpReq): Promise<User> => {
        setIsLoading(true);
        try {
            const res = await axios.post("/api/auth/signup", req,)
            if (res.status !== 200) {
                throw new Error("Sign up failed with status: " + res.status);
            }

            const {email, name, id}: User = res.data as SignUpRes;
            setUser({email, name, id});
            return {email, name, id}
        } catch (error) {
            console.error("Sign up failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const login = async (req: LoginReq): Promise<User> => {
        setIsLoading(true);
        try {
            const res = await axios.post(
                "/api/auth/login",
                req,
                {withCredentials: true}
            )
            if (res.status !== 200) {
                throw new Error("Login failed with status: " + res.status);
            }
            const {email, name, id}: User = res.data as LoginRes;
            setUser({email, name, id});
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
            const res = await axios.get(`/oauth2/authorization/${provider}`);
            console.log(res);
        } catch (error) {
            console.error("login by OAuth failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const setRedirectUrl = async (url: string) => {
        setIsLoading(true)
        try {
            const res = await axios.post(
                "/api/auth/set-redirect",
                null,
                {
                    params: {
                        redirectUrl: url
                    },
                    withCredentials: true
                }
            );
        } catch (error) {
            console.error("login by OAuth failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{isLoading, user, signUp, login, loginByOAuth, setRedirectUrl}}>
            {children}
        </AuthContext.Provider>
    )
}