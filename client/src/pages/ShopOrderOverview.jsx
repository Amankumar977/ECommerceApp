import React, { useEffect } from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer/Footer";
import ShopOrderOverView from "../components/ShopOrderOverView/ShopOrderOverView.jsx";
import DashBoardHeader from "../components/DashBoard/DashBoardHeader.jsx";
const ShopOrderOverview = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <DashBoardHeader />
      <ShopOrderOverView />
      <Footer />
    </div>
  );
};

export default ShopOrderOverview;
