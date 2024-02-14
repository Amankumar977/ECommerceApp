import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { IoBagHandleOutline } from "react-icons/io5";
import hoodie from "../../assets/hoodie.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, changeQuantity } from "../../redux/reducers/cart";
import { toast } from "react-toastify";
const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const totalPrice =
    cart &&
    cart.reduce(
      (total, item) => total + item.discountedPrice * item.quantity,
      0
    );
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen  overflow-auto z-40">
      <div className="fixed top-0 right-0 min-h-full w-[80%] 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm overflow-auto z-40">
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
            <h5 className="pl-2 text-[20px] font-[500]">{cart.length} items</h5>
          </div>
          {/* Cart items */}
          <br />
          <div className="w-full border-t overflow-auto max-h-[65vh] ">
            {cart &&
              cart.map((data, index) => (
                <ShowCartItems key={data._id} data={data} />
              ))}
          </div>
        </div>
        {totalPrice > 1 && (
          <div className="px-5 mb-3">
            {/* Check Out button */}
            <Link to="/checkout">
              <div className="h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px] z-10">
                <h1 className="text-white text-[18px] font-[600]">
                  CheckOut Now ₹{totalPrice}
                </h1>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

const ShowCartItems = ({ data }) => {
  const nameOfProduct = data.name;
  const redirectingName = nameOfProduct.replace(/\s+/g, "-");
  const [value, setValue] = useState(data.quantity);
  const totalPrice = data.discountedPrice * data.quantity;
  const dispatch = useDispatch();
  let handleIncQty = () => {
    if (data.quantity >= data.stock) {
      return toast.error(`We're sorry, we have only ${data.stock} quantity`);
    }
    setValue(value + 1);
    const item = { productId: data._id, changeBy: 1 };
    dispatch(changeQuantity(item));
  };
  let handleDecQty = () => {
    setValue(value === 1 ? 1 : value - 1);
    const item = { productId: data._id, changeBy: -1 };
    dispatch(changeQuantity(item));
  };
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          {/* Increment item quantity */}
          <div
            className="bg-[#e44343] border-[#443473] rounded-full h-[25px] w-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => {
              handleIncQty();
            }}>
            <span className="text-white">+</span>
          </div>
          <span className="pl-[10px] ">{value}</span>
          {/* Decrement item quantity */}
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => handleDecQty()}>
            <span className="text-gray-500">-</span>
          </div>
        </div>
        {/* Item image */}
        <img
          src={data.images[0]}
          alt={hoodie}
          className="w-[60px] h-[60px] m-4"
        />
        <div className="pl-[15px]">
          {/* Item details */}
          <Link to={`/products/${redirectingName}`}>
            <h1>{data.name.slice(0, 40)}...</h1>
          </Link>

          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ₹ {data.discountedPrice} * {value}
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
          onClick={() => {
            dispatch(removeFromCart(data._id));
            toast.info(
              `${data.name.slice(0, 30)} has been removed from the cart`
            );
          }}
        />
      </div>
    </div>
  );
};

export default Cart;
