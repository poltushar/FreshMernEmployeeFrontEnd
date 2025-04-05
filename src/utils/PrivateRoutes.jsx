/* eslint-disable react/prop-types */
import { useAuth } from "../context/authContext";

import { Navigate } from "react-router-dom";

//this is a part 2 section add

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading ....</div>;
  }

  return user ? children : <Navigate to="/login"></Navigate>;
};

export default PrivateRoutes;
