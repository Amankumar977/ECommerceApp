import React, { useState } from "react";
import styles from "../../styles/styles";
import { productData } from "../../static/data";
import ProductCard from "../Route/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import Button from "../form/Button";
import { useSelector } from "react-redux";
const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  const { seller } = useSelector((state) => state.seller);

  return (
    <div className="w-full p-2 font-mono ">
      <div className="flex items-center gap-[20px] justify-between">
        <div className="flex  gap-[20px] flex-wrap">
          <div className={`${styles.normalFlex}`}>
            <h5
              className={`font-[600] text-[20px] cursor-pointer  ${
                active == 1 ? "text-red-500" : "text-[#555]"
              }`}
              onClick={() => {
                setActive(1);
              }}>
              Shop Products
            </h5>
          </div>
          <div className={`${styles.normalFlex}`}>
            <h5
              className={`font-[600] text-[20px] cursor-pointer ${
                active == 2 ? "text-red-500" : "text-[#555]"
              }`}
              onClick={() => {
                setActive(2);
              }}>
              Running events
            </h5>
          </div>
          <div className={`${styles.normalFlex}`}>
            <h5
              className={`font-[600] text-[20px] cursor-pointer  ${
                active == 3 ? "text-red-500" : "text-[#555]"
              }`}
              onClick={() => {
                setActive(3);
              }}>
              Shop Reviews
            </h5>
          </div>
        </div>
        {isOwner && (
          <Link to="/dashboard">
            <Button
              className={`${styles.button} !bg-black text-white`}
              text={"Go to dashbaord"}
            />
          </Link>
        )}
      </div>

      <br />
      <div className="grid grid-cols-1 gap-[20px] md:grid-col-2 md:gap-[25px] lg:grid-cols-3 xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
        {active == 1 &&
          productData &&
          productData.map((data) => (
            <ProductCard data={data} alt={data.name} key={data.id} />
          ))}
      </div>
    </div>
  );
};

export default ShopProfileData;
