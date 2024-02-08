import React, { useEffect } from "react";
import ShopLogin from "../components/ShopLogin/ShopLogin";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ShopLoginPage = () => {
  const { seller, isSellerAuthenticated } = useSelector(
    (state) => state.seller
  );
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect if seller is authenticated
    if (isSellerAuthenticated) {
      navigate(`/dashboard`);
    }
  }, [isSellerAuthenticated, seller]);

  return (
    <div>
      <ShopLogin />
    </div>
  );
};

export default ShopLoginPage;
