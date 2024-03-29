import React, { useEffect, useState } from "react";
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
import {
  addToWishList,
  removeFromWishList,
} from "../../../redux/reducers/wishList";
import { Link } from "react-router-dom";
const ProductDetailsCard = ({ setOpen, data }) => {
  const productName = data.name.replace(/\s+/g, "-");
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);
  useEffect(() => {
    const doesItemExist =
      wishList && wishList.find((item) => item._id === data._id);
    if (doesItemExist) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishList]);

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
  const handleAddToWishList = () => {
    setClick(!click);
    dispatch(addToWishList(data));
    toast.success("Item added to wishList");
  };
  const handleRemoveFromWishList = () => {
    setClick(!click);
    dispatch(removeFromWishList(data._id));
    toast.info("item has been removed from the wishlist");
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
                <Link to={`/products/${productName}`}>
                  <h1 className={`${styles.productTitle} text-[20px]`}>
                    {data.name}
                  </h1>
                </Link>
                <p>{data.description}</p>
                <div className="flex pt-6">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    ₹ {data.discountedPrice}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + " ₹" : null}
                  </h3>
                </div>
                <div
                  className={` flex items-center mt-12 justify-between pr-3`}>
                  <div className={`${data.stock < 1 ? "hidden" : "block"} `}>
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
                        size={data.stock < 1 ? 45 : 22}
                        className="cursor-pointer"
                        onClick={() => handleRemoveFromWishList()}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={data.stock < 1 ? 45 : 22}
                        className="cursor-pointer"
                        onClick={() => {
                          handleAddToWishList();
                        }}
                        color={click ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`${styles.button} ${
                    data.stock < 1 ? "hidden" : "flex"
                  } mt-6 rounded-[4px] h-11 flex items-center`}
                  onClick={handleAddTocart}>
                  <span className="text-[#fff] flex items-center justify-center">
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
                {data.stock < 1 && (
                  <p className="mt-6 text-2xl text-green-700">
                    Item is out stock, please add to wishlist for the stock
                    update.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
