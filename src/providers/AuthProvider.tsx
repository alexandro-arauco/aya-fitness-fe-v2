"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { createContext, useContext, useEffect, useState } from "react";

type AuthProvidesContextValue = {
  userInfo: Record<string, any>;
};

const AuthProviderContext = createContext<AuthProvidesContextValue | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userInfo, setUserInfo] = useState<Record<string, any>>({});
  const { getItem } = useLocalStorage<Record<string, any>>();
  const information = getItem("user-info");

  useEffect(() => {
    if (information) {
      console.log(information);
      setUserInfo(information);
    }
  }, [JSON.stringify(information)]);

  return (
    <AuthProviderContext.Provider value={{ userInfo }}>
      {children}
    </AuthProviderContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthProviderContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
