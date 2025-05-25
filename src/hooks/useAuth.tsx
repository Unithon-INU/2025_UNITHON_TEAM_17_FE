import {useState, useEffect, useContext, createContext} from 'react';
import axios from "axios";

interface AuthContextProps {
    isLoading: boolean;
    signUp: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
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

    const signUp = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const res = await axios.post("/api/auth/signup", {
                email,
                password
            })
            console.log(res)
        } catch (error) {
            console.error("Sign up failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const res = await axios.post("/api/auth/login", {
                email,
                password
            })
            console.log(res)
        } catch (error) {
            console.error("Sign up failed:", error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{isLoading, signUp, login}}>
            {children}
        </AuthContext.Provider>
    )
}