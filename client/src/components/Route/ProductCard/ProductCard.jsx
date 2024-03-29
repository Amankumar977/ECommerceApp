import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard.jsx";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/reducers/cart.js";
import { toast } from "react-toastify";
import {
  addToWishList,
  removeFromWishList,
} from "../../../redux/reducers/wishList.js";
const ProductCard = ({ data, alt }) => {
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
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");
  let handleAddToCart = () => {
    const doesItemExist = cart && cart.find((item) => item._id == data._id);
    if (doesItemExist) {
      return toast.error(
        `The item ${data.name.slice(0, 10)} is already present in the cart`
      );
    }
    const newItem = { ...data, quantity: 1 };
    dispatch(addToCart(newItem));
    toast.success(`The item ${data.name.slice(0, 10)} is added to the cart`);
  };
  let handleAddToWishList = () => {
    setClick(true);
    dispatch(addToWishList(data));
    toast.success("Item added to wishlist");
  };
  let handleRemoveFromWishList = () => {
    setClick(false);
    dispatch(removeFromWishList(data._id));
    toast.info("Item removed from wishlist");
  };

  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
      <div className="flex justify-end"></div>
      <Link to={`/products/${product_name}`}>
        <img
          src={data.images[0]}
          alt={alt}
          className="w-full h-[170px] object-contain"
        />
      </Link>
      <Link to={`/shop/preview/${data.shop._id}`}>
        <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
      </Link>
      <Link to={`/products/${product_name}`}>
        <h4 className="pb-3 font-[500]">
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>
        <div className="flex ">
          <AiFillStar
            className="mr-2 cursor-pointer text-[#F6BA00]"
            size={20}
          />
          <AiFillStar
            className="mr-2 cursor-pointer text-[#F6BA00]"
            size={20}
          />
          <AiFillStar
            className="mr-2 cursor-pointer text-[#F6BA00]"
            size={20}
          />
          <AiFillStar
            className="mr-2 cursor-pointer text-[#F6BA00]"
            size={20}
          />
          <AiOutlineStar
            className="mr-2 cursor-pointer text-[#F6BA00]"
            size={20}
          />
        </div>
        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              ₹{" "}
              {data.originalPrice == 0
                ? data.originalPrice
                : data.discountedPrice}
            </h5>
            <h4 className={`${styles.price}`}>
              {data.originalPrice ? data.originalPrice + " ₹" : null}
            </h4>
          </div>
          {data.stock < 1 ? (
            <span className="font-400 text-[10px] text-[#68d284]">
              Out of stock
            </span>
          ) : (
            <span className="font-400 text-[17px] text-[#68d284]">
              {data.sold_out} sold
            </span>
          )}
        </div>
      </Link>
      {/**Side Options */}
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => {
              handleRemoveFromWishList();
            }}
            color={click ? "red" : "#333"}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => {
              handleAddToWishList();
            }}
            color={click ? "red" : "#333"}
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-12"
          onClick={() => {
            setOpen(!open);
          }}
          color={"#333"}
          title="Quick View"
        />
        <AiOutlineShoppingCart
          size={25}
          className={`${
            data.stock < 1 ? "hidden" : "block"
          } cursor-pointer absolute right-2 top-20`}
          color={"#444"}
          title="Add To Cart"
          onClick={() => {
            handleAddToCart();
          }}
        />
        {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
      </div>
    </div>
  );
};

export default ProductCard;
