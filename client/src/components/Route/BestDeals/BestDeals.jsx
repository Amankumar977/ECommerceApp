import React, { useEffect, useState } from "react";
import { productData } from "../../../static/data";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
const BestDeals = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const data =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstFiveTopProducts = data.slice(0, 5);
    setData(firstFiveTopProducts);
  }, []);
  return (
    <div className={`${styles.section} `}>
      <div className={`${styles.heading} `}>
        <h1>Best Deals</h1>
      </div>
      <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
        {data &&
          data.map((data) => (
            <ProductCard data={data} key={data.id} alt={data.name} />
          ))}
      </div>
    </div>
  );
};

export default BestDeals;
