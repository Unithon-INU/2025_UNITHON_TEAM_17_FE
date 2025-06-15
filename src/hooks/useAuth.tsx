import type { ReactNode } from 'react';
import { useState, useContext, createContext } from 'react';
import axios from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginByOAuth : (provider: "google" | "kakao") => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const signUp = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", {
        email,
        password,
        name
      });
      console.log(res);
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
      });
      console.log(res);
    } catch (error) {
      console.error("Login failed:", error);
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

  return (
    <AuthContext.Provider value={{ isLoading, signUp, login, loginByOAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
