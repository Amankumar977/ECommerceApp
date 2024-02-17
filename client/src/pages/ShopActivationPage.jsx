import React, { useEffect } from "react";
import ShopActivation from "../components/ShopActivation/ShopActivation.jsx";
const ShopActivationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <ShopActivation />
    </div>
  );
};

export default ShopActivationPage;
