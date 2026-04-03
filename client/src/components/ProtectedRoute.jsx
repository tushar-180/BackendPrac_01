import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { FidgetSpinner } from "react-loader-spinner";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  console.log("user 3", user);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FidgetSpinner
          visible={true}
          height="80"
          width="80"
          ariaLabel="fidget-spinner-loading"
          wrapperStyle={{}}
          wrapperClass="fidget-spinner-wrapper"
        />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
