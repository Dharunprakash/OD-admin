import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/Auth";


interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string; 
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const { isLoggedIn, user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;  // Loading state while checking auth
  }

  if (!isLoggedIn) {
    // console.log("Not logged in");
    return <Navigate to="/login" />;  // Redirect to login if not logged in
  }
  console.log("User role: ",user,user.role);
  if (requiredRole && user?.role !== requiredRole) {
    console.log("Unauthorized");
    return (
      <div>
        <h1>Unauthorized</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    )
  }

  return <>{children}</>;
};

export default PrivateRoute;
