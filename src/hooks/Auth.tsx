// src/hooks/useAuth.tsx
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


const useAuth = () => {
  const { user, login, logout, isLoggedIn, loading } = useContext(AuthContext);
  return { user, login, logout, isLoggedIn, loading };
};

export default useAuth;
