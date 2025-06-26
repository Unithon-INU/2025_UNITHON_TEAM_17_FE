import {createContext, FC, useContext, useState} from 'react';
import type {ReactNode} from 'react';
import axios from "axios";
import {LoginReq, LoginRes, SignUpReq, SignUpRes, User} from "../type/auth";

type SessionLogin = {
    loginStatus: true;
    id: User["id"];
    name: User["name"];
}
type SessionNotLogin = {
    loginStatus: false;
    message: "세션 없음 (로그인 안됨)"
}

type SessionCheckRes = SessionLogin | SessionNotLogin

interface AuthContextProps {
    isLoading: boolean;
    user: User | null;

    signUp: (req: SignUpReq) => Promise<User>;
    login: (req: LoginReq) => Promise<User>;
    loginByOAuth: (provider: "google" | "kakao") => Promise<void>;
    setRedirectUrl: (url: string) => void;

    sessionCheck: () => Promise<SessionCheckRes>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider: FC = ({children}) => {
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

    const sessionCheck = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(
                "/api/auth/session-check",
                {withCredentials: true}
            );

            const body = res.data as SessionCheckRes;
            if (body.loginStatus) {
                setUser({name: body.name, id: body.id, email: user?.email || ""});
            }
            return body
        } catch (error) {
            console.error("Session check failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{isLoading, user, signUp, login, loginByOAuth, setRedirectUrl, sessionCheck}}>
            {children}
        </AuthContext.Provider>
    )
}