import React, { useEffect } from "react";
import ShopCreate from "../components/ShopCreate/ShopCreate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const ShopCreatePage = () => {
  const { seller, isSellerAuthenticated } = useSelector(
    (state) => state.seller
  );
  const navigate = useNavigate();
  useEffect(() => {
    // Redirect if seller is authenticated
    if (isSellerAuthenticated) {
      navigate(`/dashboard`);
    }
    window.scrollTo(0, 0);
  }, [isSellerAuthenticated, seller]);
  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
