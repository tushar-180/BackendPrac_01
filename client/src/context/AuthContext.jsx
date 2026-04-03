import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/axios";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await api.get("/users/profile");
        console.log(res.data.data);
        setUser(res.data.data);
      } catch (error) {
        console.log("error", error);
        setUser(null)
      }finally{
        setLoading(false)
      }
    };
    verifyUser();
    // console.log("user", user);
  }, []);

  const value = {
    user,
    setUser,
    loading
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);
