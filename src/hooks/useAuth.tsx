import {useState, useEffect, useContext, createContext} from 'react';

interface AuthContextProps {
    signUp: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () : AuthContextProps => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context
}

export const AuthProvider: React.FC = ({children}) => {
    const signUp = async (email: string, password: string) => {
        console.log("회원가입 중")
    }

    return (
        <AuthContext.Provider value={{signUp}}>
            {children}
        </AuthContext.Provider>
    )
}