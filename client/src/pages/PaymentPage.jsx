import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer/Footer";
import Payment from "../components/CheckOut/Payment.jsx";
const PaymentPage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Payment />
      <Footer />
    </div>
  );
};

export default PaymentPage;
