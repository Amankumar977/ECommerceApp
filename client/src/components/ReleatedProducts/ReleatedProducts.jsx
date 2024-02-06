import React, { useEffect, useState } from "react";
import ProductCard from "../Route/ProductCard/ProductCard";
import { productData } from "../../static/data";
import styles from "../../styles/styles";
const ReleatedProducts = ({ data }) => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    if (data) {
      const relatedData =
        productData &&
        productData.filter((item) => item.category == data.category);
      setProducts(relatedData);
    }
  }, [data]);
  console.log(products);
  return (
    <div>
      {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}>
            Realted Products
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:grip-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 ">
            {products &&
              products.map((i) => (
                <ProductCard data={i} alt={i.category} key={i.id} />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReleatedProducts;
