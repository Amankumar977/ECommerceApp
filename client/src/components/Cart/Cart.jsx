import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import hoodie from "../../assets/hoodie.png";
import { Link } from "react-router-dom";

const Cart = ({ setOpenCart }) => {
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
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 overflow-auto">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm overflow-auto">
        <div>
          {/* Close button */}
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
          </div>
          {/* Items length */}
          <div className={`${styles.normalFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {cartData.length} items
            </h5>
          </div>
          {/* Cart items */}
          <br />
          <div className="w-full border-t overflow-auto max-h-[65vh] ">
            {cartData &&
              cartData.map((data, index) => (
                <ShowCartItems key={index} data={data} />
              ))}
          </div>
        </div>
        <div className="px-5 mb-3">
          {/* Check Out button */}
          <Link to="/checkout">
            <div className="h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px] z-10">
              <h1 className="text-white text-[18px] font-[600]">
                CheckOut Now ₹{2500}
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ShowCartItems = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          {/* Increment item quantity */}
          <div
            className="bg-[#e44343] border-[#443473] rounded-full h-[25px] w-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => {
              setValue(value + 1);
            }}>
            <span className="text-white">+</span>
          </div>
          <span className="pl-[10px] ">{value}</span>
          {/* Decrement item quantity */}
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => setValue(value === 1 ? 1 : value - 1)}>
            <span className="text-gray-500">-</span>
          </div>
        </div>
        {/* Item image */}
        <img src={hoodie} alt={hoodie} className="w-[80px] h-[80px] m-4" />
        <div className="pl-[15px]">
          {/* Item details */}
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ₹ {data.price} * {value}
          </h4>
          {/* Total price */}
          <h4 className="pt-2 text-[15px] text-red-500 font-bold">
            ₹ {totalPrice}
          </h4>
        </div>
        {/* Remove item button */}
        <RxCross1
          className="cursor-pointer text-xl"
          values="Remove the item from the cart"
        />
      </div>
    </div>
  );
};

export default Cart;
