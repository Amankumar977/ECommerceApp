import React, { useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import ReleatedProducts from "../components/ReleatedProducts/ReleatedProducts.jsx";
import Header from "../components/Layouts/Header";
import Footer from "../components/Layouts/Footer/Footer";
import { useParams } from "react-router-dom";
import { productData } from "../static/data";
import { useSelector } from "react-redux";
const ProductDetailsPage = () => {
  const { name } = useParams();
  const { allProducts } = useSelector((state) => state.allProducts);
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");
  useEffect(() => {
    window.scrollTo(0, 0);
    const data =
      allProducts && [...allProducts].find((i) => i.name == productName);
    setData(data);
  }, [productName, data]);

  return (
    data && (
      <div>
        <Header />
        <ProductDetails data={data} />
        <ReleatedProducts data={data} />
        <Footer />
      </div>
    )
  );
};

export default ProductDetailsPage;
