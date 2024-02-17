import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer/Footer";
import Shipping from "../components/CheckOut/Shipping.jsx";
const CheckOutPage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Shipping />
      <Footer />
    </div>
  );
};

export default CheckOutPage;
