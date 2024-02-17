import React, { useEffect } from "react";
import ShopHome from "../components/ShopHome/ShopHome";
const ShopHomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <ShopHome />
    </div>
  );
};

export default ShopHomePage;
