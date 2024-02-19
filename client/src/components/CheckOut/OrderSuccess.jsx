import React, { useEffect } from "react";
import Lottie from "lottie-react";
import Success from "../../assets/animation/orderSuccess.json";
import CheckOutSteps from "./CheckOutSteps";
import { emptyCart } from "../../redux/reducers/cart";
import { useDispatch } from "react-redux";
const OrderSuccess = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(emptyCart([]));
    localStorage.setItem("latestOrder", JSON.stringify([]));
  }, []);
  const style = {
    height: 600,
    width: 600,
  };

  return (
    <>
      <div className="w-full flex justify-center h-screen items-center flex-col">
        {/* <CheckOutSteps active={3}  /> */}
        <Lottie animationData={Success} style={style} />
      </div>
    </>
  );
};

export default OrderSuccess;
