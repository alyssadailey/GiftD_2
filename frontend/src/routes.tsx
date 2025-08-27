import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

interface PrivateRouteProps {
  children: ReactElement; 
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};
