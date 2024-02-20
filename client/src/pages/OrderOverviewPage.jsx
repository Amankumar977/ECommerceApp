import React, { useEffect } from "react";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer/Footer";
import OrderOverview from "../components/OrderOverview/OrderOverview";
const OrderOverviewPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header activeHeading={1} />
      <OrderOverview />
      <Footer />
    </div>
  );
};

export default OrderOverviewPage;
