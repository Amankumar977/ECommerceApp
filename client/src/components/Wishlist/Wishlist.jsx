import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import hoodie from "../../assets/hoodie.png";
import { AiOutlineHeart } from "react-icons/ai";
import { MdOutlineAddShoppingCart } from "react-icons/md";

const Wishlist = ({ setOpenWishList }) => {
  // Sample cart data
  const cartData = [
    {
      name: "Best Hoodie of the entire universe just wow and beautiful",
      description: "test",
      price: 999,
    },
    {
      name: "Best Hoodie of the entire universe just wow and beautiful",
      description: "test",
      price: 999,
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-40 overflow-auto">
      <div className="fixed top-0 right-0 min-h-full w-[75%] 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm overflow-auto">
        <div>
          <div className="flex w-full justify-between pt-5 pr-5 text-2xl font-mono p-4">
            <span>Dream List</span>
            <RxCross1
              className="cursor-pointer"
              onClick={() => {
                setOpenWishList(false);
              }}
            />
          </div>
          {/* Items length */}
          <div className={`${styles.normalFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {cartData.length} items
            </h5>
          </div>
          {/* Cart items */}
          <br />
          <div className="w-full border-t overflow-auto max-h-[100vh] ">
            {cartData &&
              cartData.map((data, index) => (
                <ShowWishlistItems key={index} data={data} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ShowWishlistItems = ({ data }) => {
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          {/* Increment item quantity */}
          <div className="text-gray-400">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenWishList(false)}
            />
          </div>
        </div>
        {/* Item image */}
        <img src={hoodie} alt={hoodie} className="w-[80px] h-[80px] m-4" />
        <div className="pl-[15px]">
          {/* Item details */}
          <h1>{data.name}</h1>
          {/* Total price */}
          <h4 className="pt-2 text-[25px] text-red-500 font-bold">
            ₹ {data.price}
          </h4>
        </div>
        {/* Remove item button */}
        <MdOutlineAddShoppingCart
          className="cursor-pointer text-8xl text-[#333232]"
          values="Remove the item from the cart"
        />
      </div>
    </div>
  );
};

export default Wishlist;
