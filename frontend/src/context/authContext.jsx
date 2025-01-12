import React, { createContext, useState, useEffect, useContext } from "react";
import { getItem } from "../utils/localStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const isUserLoggedIn = getItem("isLoggedIn");
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn || false);

  useEffect(() => {
    const token = document.cookie.includes("accessToken");
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
