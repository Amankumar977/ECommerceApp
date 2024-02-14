import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/reducers/cart";
import { useDispatch, useSelector } from "react-redux";
const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);
  const dispatch = useDispatch();
  let handleAddTocart = () => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      return toast.error("Item is already in cart!");
    }
    if (count > data.stock) {
      return toast.error(
        `oops the item only has ${data.stock} quantity available`
      );
    }
    const newItem = { ...data, quantity: count };
    dispatch(addToCart(newItem));
    setCount(1);
    toast.success(`${data.name} item added to cart.`);
  };
  const handleMessageSubmit = () => {};
  return (
    <div className="bg-white">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute top-3 right-3 z-50 "
              onClick={() => setOpen(false)}
            />
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%] mx-4 pb-4">
                <img src={data.images[0]} alt={data.title} />
                <div className="flex">
                  <img
                    src={data.shop.avatar}
                    alt={data.title}
                    className="w-[60px] h-[60px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="pb-3 text-[15px] font-bold">
                      4.5 / 5.0 Ratings
                    </h5>
                  </div>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={() => {
                    handleMessageSubmit;
                  }}>
                  <span className="text-white flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-red-600 ">
                  ({data.sold_out}) Sold out
                </h5>
              </div>
              <div className="w-full 800px:w-[50%] mr-5 mt-4">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>
                <div className="flex pt-6">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    ₹ {data.discountedPrice}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + " ₹" : null}
                  </h3>
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
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                  onClick={handleAddTocart}>
                  <span className="text-[#fff] flex items-center justify-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
