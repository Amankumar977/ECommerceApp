import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
                  src={data.images.length > select && data.images[select]}
                  alt={data.title}
                  className="w-[80%]"
                />
                <div className="w-full flex ">
                  <div
                    className={`${
                      select == 0 ? "border" : null
                    } cursor-pointer`}>
                    <img
                      src={data?.images[0]}
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
                      src={data?.images[1]}
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
                    &#8377; {data.discountedPrice}
                  </h4>{" "}
                  {data.price ? (
                    <h3 className={`${styles.originalPrice}`}>
                      &#8377; {data.originalPrice ? data.originalPrice : null}
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
                  <Link to={`/shop/preview/${data.shop._id}`}>
                    <div className="flex">
                      <img
                        src={data.shop.avatar}
                        alt={data.title}
                        className="w-[55px] h-[55px] rounded-full mr-2"
                      />
                      <div>
                        <h3 className={`${styles.shop_name}`}>
                          {data.shop.name}
                        </h3>
                        <h5 className="pb-3 text-[15px] font-bold">
                          4.5 / 5.0 Ratings
                        </h5>
                      </div>
                    </div>
                  </Link>
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
                    ({data.sold_out}) items Sold
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
const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded ">
      <div className="w-full  flex justify-between border-b pt-10 pb-2 ">
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
        <div className="relative">
          <h5
            className="text-[#000] text-[10px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(2)}>
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`}> </div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[10px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            onClick={() => setActive(3)}>
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`}> </div>
          ) : null}
        </div>
      </div>
      {active == 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active == 2 ? (
        <div className="w-full flex justify-center min-h-[40vh] items-center">
          <p>No reviews yet!</p>
        </div>
      ) : null}
      {active === 3 && (
        <div className="w-full block 800px:flex p-5 ">
          <div className="w-full 800px:w-[50%]">
            <div>
              <Link to={`/shop/preview/${data.shop._id}`}>
                <div className={`${styles.normalFlex}`}>
                  <img
                    src={data.shop.avatar}
                    alt={data.description}
                    className="w-[55px] h-[55px] rounded-full "
                  />
                  <div className="pl-3">
                    <h3 className={`${styles.shop_name}`}> {data.shop.name}</h3>
                    <h5 className="pb-3 text-[15px]">4.5 /5 Ratings</h5>
                  </div>
                </div>
              </Link>
              <p className="pt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                dolorum iusto minima consequatur voluptate nam consequuntur
                magnam architecto, minus illum similique nisi eius quia neque
                alias dignissimos, eveniet eaque libero.
              </p>
            </div>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600] ">
                Total Reviews: <span className="font-[500]">32</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products : <span className="font-[500]">1021</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Joined on :{" "}
                <span className="font-[500]">
                  {data.shop.createdAt.slice(0, 10)}
                </span>
              </h5>
              <Link to={`/shopHome/:${data.shop._id}`}>
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}>
                  <h4 className="text-white">Visit shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetails;
