import React, { useEffect, useState } from "react";
import Header from "../Layouts/Header";
import styles from "../../styles/styles";
import { useLocation } from "react-router-dom";
import { productData } from "../../static/data";
import ProductCard from "../Route/ProductCard/ProductCard";

const Product = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  useEffect(() => {
    if (categoryData == null) {
      const sortedData =
        productData && productData.sort((a, b) => a.total_sell - b.total_sell);
      setData(sortedData);
    } else {
      const filteredData =
        productData && productData.filter((a) => a.category === categoryData);
      setData(filteredData);
    }
  }, []);

  return (
    <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-col-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data.map((data) => (
              <ProductCard key={data.id} data={data} alt={data.description} />
            ))}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-3xl text-gray-500">
            We're really Sorry, But for this for no products are available.
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default Product;
