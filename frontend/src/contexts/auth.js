import React, { createContext, useState, useEffect, useContext } from "react";
import * as auth from "../services/auth";
import api from "../services/api";

const AuthContext = createContext({
  signed: false,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await localStorage.getItem("@RNAuth:user");
      const storageToken = await localStorage.getItem("@RNAuth:token");

      if (storageUser && storageToken) {
        api.defaults.headers["Authorization"] = `Bearer ${storageToken}`;
        setUser(JSON.parse(storageUser));
        setLoading(false);
      } else if (!storageUser && !storageToken) {
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);
  async function signIn() {
    const response = await auth.signIn();
    setUser(response.user);
    api.defaults.headers["Authorization"] = `Bearer ${response.token}`;
    await localStorage.setItem("@RNAuth:user", JSON.stringify(response.user));
    await localStorage.setItem("@RNAuth:token", response.token);
  }
  function signOut() {
    localStorage.clear(setUser(null));
  }
  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signIn, signOut, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
