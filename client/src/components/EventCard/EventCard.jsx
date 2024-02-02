import React, { useEffect, useState } from "react";
import { productData } from "../../static/data";
import styles from "../../styles/styles";
import CountDown from "../../CountDown/CountDown.jsx";
const EventCard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const sortedData = productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(sortedData.slice(0, 1));
  }, []);
  return (
    <>
      {data.length > 0 && (
        <div className={`w-full block bg-white rounded-lg lg:flex p-2 `}>
          <div className="w-full lg:w-[50%] m-auto">
            <img src={data[0].image_Url[0].url} alt={data[0].title} />
          </div>
          <div className="w-full lg:w-[50%] flex flex-col justify-center">
            <h2 className={`${styles.productTitle}`}>{data[0].name}</h2>
            <p className="mt-2">{data[0].description}</p>
            <div className="flex py-2 justify-between ">
              <div className="flex">
                <h5 className="font-[500] text-[18px]  pr-3 ">
                  {data[0].price ? data[0].price : data[0].discount_price} ₹
                </h5>
                <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                  {data[0].price ? data[0].discount_price : null} ₹
                </h5>
              </div>
              <span className="text-green-600 pr-4 font-[400] text-[17px]">
                {data[0].total_sell} sold
              </span>
            </div>
            <CountDown />
          </div>
        </div>
      )}
    </>
  );
};

export default EventCard;
