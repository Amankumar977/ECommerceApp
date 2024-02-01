import React from "react";
import styles from "../../../styles/styles";
import { brandingData, categoriesData } from "../../../static/data";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white rounded-md px-2 py-2 `}>
          {brandingData &&
            brandingData.map((data) => (
              <div className="flex items-center justify-center" key={data.id}>
                {data.icon}
                <div className="px-3 ">
                  <h3 className="font-bold text-sm md:text-base ">
                    {data.title}
                  </h3>
                  <p className="text-xs md:text-sm">{data.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/**Categories section */}
      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories">
        <div className="grid grid-cols-1 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-[20px] xl:grid-cols-5 xl:gap-[30px]">
          {categoriesData &&
            categoriesData.map((data) => {
              const handleSubmit = (i) => {
                navigate(`/products?categories=${data.title}`);
              };
              return (
                <div
                  className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
                  key={data.id}
                  onClick={() => handleSubmit(data)}>
                  <h5 className={`text-[18px] leading-[1.3]`}>{data.title}</h5>
                  <img
                    src={data.image_Url}
                    alt="Categories Image"
                    className="w-[120px] object-cover"
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
