import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({isAdmin, Component}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <>
      {!isAuthenticated ? (
        <Navigate to="/login" />
      ):(isAdmin && user.role !== "admin" ? (
        <Navigate to="/login" />
      ):(
        <Component/>
      ))}      
      </>
  );
};

export default ProtectedRoute;