import React from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer/Footer";
import TrackOrder from "../components/TrackOrder/TrackOrder.jsx";
const TrackOrderPage = () => {
  return (
    <div>
      <Header />
      <TrackOrder />
      <Footer />
    </div>
  );
};

export default TrackOrderPage;
