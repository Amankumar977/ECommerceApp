import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const handleMessageSubmit = () => {
    navigate("/anything");
  };
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:80%  `}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data.image_Url[select].url}
                  alt={data.title}
                  className="w-[80%]"
                />
                <div className="w-full flex ">
                  <div
                    className={`${
                      select == 0 ? "border" : null
                    } cursor-pointer`}>
                    <img
                      src={data?.image_Url[0].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => {
                        setSelect(0);
                      }}
                    />
                  </div>
                  <div
                    className={`${
                      select == 1 ? "border" : null
                    } cursor-pointer`}>
                    <img
                      src={data?.image_Url[1].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => {
                        setSelect(1);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-4">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p className="mt-4">{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    &#8377; {data.discount_price}
                  </h4>{" "}
                  {data.price ? (
                    <h3 className={`${styles.price}`}>
                      &#8377; {data.price ? data.price : null}
                    </h3>
                  ) : null}
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      disabled={count === 1}
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l hover:opacity-75 transition px-4 py-2 shadow-lg duration-300 ease-in-out"
                      onClick={() => {
                        setCount(count - 1);
                      }}>
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[9.5px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r hover:opacity-75 transition px-4 py-2 shadow-lg duration-300 ease-in-out"
                      onClick={() => {
                        setCount(count + 1);
                      }}>
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => {
                          setClick(!click);
                        }}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={22}
                        className="cursor-pointer"
                        onClick={() => {
                          setClick(!click);
                        }}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-16 rounded-[4px] h-11 flex items-center`}>
                  <span className="text-[#fff] flex items-center justify-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                {/** */}
                <div className="w-full mt-16 flex justify-between items-center">
                  <div className="flex">
                    <img
                      src={data.shop.shop_avatar.url}
                      alt={data.title}
                      className="w-[55px] h-[55px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px] font-bold">
                        {data.shop.ratings} / 5.0 Ratings
                      </h5>
                    </div>
                  </div>
                  <div
                    className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11 mx-5`}
                    onClick={() => {
                      handleMessageSubmit;
                    }}>
                    <span className="text-white flex items-center w-[20rem]  px-5">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                  <h5 className="text-[16px] text-red-600 ">
                    ({data.total_sell}) items Sold
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};
const ProductDetailsInfo = () => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded ">
      <div className="w-full justify-between border-b pt-10 pb-2 ">
        <div className="relative">
          <h5
            className="text-[#000] text-[10px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(1)}>
            Product details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`}> </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
