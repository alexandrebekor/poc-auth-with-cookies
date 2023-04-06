import { headers } from "@/lib/fetchWithContext";
import { recoverUserInformation, signInRequest } from "@/services/auth";
import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";

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

  useEffect(() => {
    const { "poc-token": token } = parseCookies();

    if (token) {
      recoverUserInformation().then((response) => {
        setUser(response.user);
      });
    }
  });

  const signIn = async ({ email, password }: SignInData) => {
    const { token, user } = await signInRequest({
      email,
      password,
    });

    setCookie(undefined, "poc-token", token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    setUser(user);

    headers["authorization"] = `Bearer ${token}`;
    headers["teste"] = `456`;

    Router.push("/dashboard");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
