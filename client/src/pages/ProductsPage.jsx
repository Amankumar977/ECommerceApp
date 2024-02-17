import React, { useEffect } from "react";
import Products from "../components/Product/Product";
const ProductsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Products />
    </div>
  );
};

export default ProductsPage;
