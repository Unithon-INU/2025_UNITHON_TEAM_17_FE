// src/context/AuthContext.tsx
import { createContext, FC, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { LoginReq, LoginRes, SignUpReq, SignUpRes, User } from "../type/auth";

type SessionLogin = {
  loginStatus: true;
  id: User["id"];
  name: User["name"];
};

type SessionNotLogin = {
  loginStatus: false;
  message: "세션 없음 (로그인 안됨)";
};

type SessionCheckRes = SessionLogin | SessionNotLogin;

interface AuthContextProps {
  isLoading: boolean;
  user: User | null;
  setUser: (user: User | null) => void; // ✅ 추가됨!
  signUp: (req: SignUpReq) => Promise<User>;
  login: (req: LoginReq) => Promise<User>;
  loginByOAuth: (provider: "google" | "kakao") => void;
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
};

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/auth/session-check", {
          withCredentials: true,
        });
        const body = res.data as SessionCheckRes;
        if (body.loginStatus) {
          setUser({ id: body.id, name: body.name, email: "" });
        }
      } catch (error) {
        console.error("자동 세션 확인 실패:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const signUp = async (req: SignUpReq): Promise<User> => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", req);
      const { email, name } = res.data;
      const newUser = { email, name, id: 0 };
      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error("Sign up failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (req: LoginReq): Promise<User> => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/login", req, {
        withCredentials: true,
      });
      const { email, name } = res.data;
      const newUser = { email, name, id: 0 };
      setUser(newUser);
      return newUser;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginByOAuth = (provider: "google" | "kakao") => {
    window.location.href = `/oauth2/authorization/${provider}`;
  };

  const setRedirectUrl = async (url: string) => {
    try {
      await axios.post("/api/auth/set-redirect", null, {
        params: { redirectUrl: url },
        withCredentials: true,
      });
    } catch (error) {
      console.error("setRedirectUrl failed:", error);
    }
  };

  const sessionCheck = async () => {
    try {
      const res = await axios.get("/api/auth/session-check", {
        withCredentials: true,
      });
      const body = res.data as SessionCheckRes;
      if (body.loginStatus) {
        setUser({ name: body.name, id: body.id, email: "" });
      }
      return body;
    } catch (error) {
      console.error("Session check failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        setUser, // ✅ 반드시 포함!
        signUp,
        login,
        loginByOAuth,
        setRedirectUrl,
        sessionCheck,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
