import React, { createContext, useState, useContext, ReactNode } from "react";
import { authLocalStorageService } from "./authLocalStorageService.ts";
import { useHandleLogin } from "./hooks/useHandleLogin.ts";
import { BackOfficeUser } from "./types.ts";

interface AuthContextType {
  logout: () => void;
  isLoggedIn: boolean;

  loginProcess: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;

  userInfo: BackOfficeUser | null;
  setUserInfo: (userInfo: BackOfficeUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userInfo, setUserInfo] = useState<BackOfficeUser | null>(
    authLocalStorageService.getUser(),
  );

  const logout = () => {
    authLocalStorageService.removeUser();
  };

  const { handleLogin } = useHandleLogin();

  const loginProcess = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const data = await handleLogin({ email, password });
      authLocalStorageService.setUser(data);
      setUserInfo(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const token = userInfo?.token;
  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider
      value={{ loginProcess, logout, isLoggedIn, userInfo, setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
