import { signInRequest } from "@/services/auth";
import Router from "next/router";
import { setCookie } from "nookies";
import { createContext, useState } from "react";

type AuthContextProps = {
  user: UserProps | null;
  isAuthenticated: boolean;
  signIn: (data: SignInData) => void;
};

export const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
  children: React.ReactNode;
};

type SignInData = {
  email: string;
  password: string;
};

type UserProps = {
  name: string;
  email: string;
  avatar: string;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProps | null>(null);
  const isAuthenticated = !!user;

  const signIn = async ({ email, password }: SignInData) => {
    const { token, user } = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, "poc-token", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    setUser(user);

    Router.push("/dashboard");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
