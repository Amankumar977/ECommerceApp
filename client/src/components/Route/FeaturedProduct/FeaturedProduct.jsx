import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";

const FeaturedProduct = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.allProducts);
  useEffect(() => {
    const averageProducts =
      allProducts && [...allProducts].sort((a, b) => a.sold_out - b.sold_out);
    setData(averageProducts.slice(0, 10));
  }, []);
  return (
    <div>
      <div className={`${styles.section} mt-5`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Product</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data &&
            data.map((data) => <ProductCard data={data} key={data._id} />)}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
