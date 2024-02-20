import React, { useEffect } from "react";
import Lottie from "lottie-react";
import Success from "../../assets/animation/orderSuccess.json";
import { emptyCart } from "../../redux/reducers/cart";
import { useDispatch } from "react-redux";
const OrderSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(emptyCart([]));
    localStorage.setItem("latestOrder", JSON.stringify([]));
  }, []);
  const style = {
    height: 500,
    width: 600,
  };

  return (
    <>
      <div className="flex  items-center flex-col">
        {/* <CheckOutSteps active={3}  /> */}
        <Lottie animationData={Success} style={style} />
        <div className="-mt-20 mb-14 text-3xl text-gray-500">
          Your order is succesful 😍
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
