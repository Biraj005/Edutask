import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./src/Store/AuthContext";

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useContext(AuthContext);
  return loggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
