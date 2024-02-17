import React, { useEffect } from "react";
import Signup from "../components/Signup/Signup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const SingupPage = () => {
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
      <Signup />
    </div>
  );
};

export default SingupPage;
