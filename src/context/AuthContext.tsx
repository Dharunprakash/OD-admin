import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type AuthData = {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoggedIn: boolean;
  loading: boolean;
};


const AuthContext = createContext<AuthData>({
  user: null,
  login: async () => {},
  logout: async () => {},
  isLoggedIn: false,
  loading: true,
});

// Define the props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user from localStorage on app start
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://od-automation.onrender.com/api/auth/login",
        { username, password }
      );
      const userData = response.data;

      console.log("Login successful:", userData,userData.user.role);
      setUser(userData.user);
      setLoading(false);

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      console.log("User role: ",user.role);
      localStorage.setItem("role", user.role); // Assuming userData has `role`

      navigate("/");
       } catch (error) {
      console.error("Login failed:", error);
      setLoading(false);
      throw error; // Handle error in UI
    }
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Determine if the user is logged in
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};



export default AuthContext;
