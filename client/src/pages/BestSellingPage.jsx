import React, { useEffect } from "react";
import BestSelling from "../components/BestSelling/BestSelling.jsx";
const BestSellingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <BestSelling />
    </div>
  );
};

export default BestSellingPage;
