import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Layouts/Loader";
const adminProtected = ({ children }) => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.user);
  if (loading === true) {
    return <Loader />;
  } else if (!loading && isAuthenticated && user && user.role !== "admin") {
    toast.error("Not authorized to access this route");
    return <Navigate to={"/"} replace={true} />;
  }
  return children;
};

export default adminProtected;
