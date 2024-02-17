import React, { useEffect } from "react";
import Login from "../components/Login/Login";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const LoginPage = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated == true) {
      navigate("/");
    }
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
