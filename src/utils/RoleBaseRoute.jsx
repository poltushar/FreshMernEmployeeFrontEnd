/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

//this is a part 2 section add

const RoleBaseRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!requiredRole.includes(user.role)) {
    <Navigate to="/unauthorized" />;
  }

  return user ? children : <Navigate to="/login"></Navigate>;
};

export default RoleBaseRoute;
