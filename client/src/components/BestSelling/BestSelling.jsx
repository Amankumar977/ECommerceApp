import React, { useEffect, useState } from "react";
import Header from "../Layouts/Header";
import styles from "../../styles/styles";
import { productData } from "../../static/data";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const BestSelling = () => {
  const { allProducts } = useSelector((state) => state.allProducts);
  const [data, setData] = useState([]);
  useEffect(() => {
    const sortedData =
      allProducts && [...allProducts].sort((a, b) => b.sold_out - a.sold_out);
    setData(sortedData);
  }, []);

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-col-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data.map((data) => (
              <ProductCard key={data._id} data={data} alt={data.description} />
            ))}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-3xl text-gray-500">
            We're really Sorry, But for this for no products are available!
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default BestSelling;
