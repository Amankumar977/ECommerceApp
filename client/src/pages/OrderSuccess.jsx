import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer/Footer";
import Success from "../components/CheckOut/OrderSuccess";
const OrderSuccess = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Success />
      <Footer />
    </div>
  );
};

export default OrderSuccess;
