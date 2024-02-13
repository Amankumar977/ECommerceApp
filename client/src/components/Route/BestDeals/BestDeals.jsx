import React, { useEffect, useState } from "react";
import { productData } from "../../../static/data";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.allProducts);
  useEffect(() => {
    const data =
      allProducts &&
      [...allProducts].sort((a, b) => b.total_sell - a.total_sell);
    const firstFiveTopProducts = data.slice(0, 5);
    setData(firstFiveTopProducts);
  }, []);
  return (
    <div className={`${styles.section} `}>
      <div className={`${styles.heading} `}>
        <h1>Best Deals</h1>
      </div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
        {data &&
          data.map((data) => (
            <ProductCard data={data} key={data._id} alt={data.name} />
          ))}
      </div>
    </div>
  );
};

export default BestDeals;
