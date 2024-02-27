import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const AllShopReport = () => {
  const { allOrders, allProducts, allEvents } = useSelector(
    (state) => state.admin
  );
  useEffect(() => {}, [allEvents, allOrders, allProducts]);
  return (
    <div className="px-2">
      <h1>Order Contribution by per shop</h1>
      <h1>Total products by per shop</h1>
      <h1>Total Events by per shop</h1>
    </div>
  );
};

export default AllShopReport;
