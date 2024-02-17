import React from "react";
import Lottie from "lottie-react";
import Success from "../../assets/animation/orderSuccess.json";
import CheckOutSteps from "./CheckOutSteps";
const OrderSuccess = () => {
  const style = {
    height: 600,
    width: 600,
  };
  return (
    <>
      <div className="w-full flex justify-center h-screen items-center flex-col">
        <CheckOutSteps active={3} />
        <Lottie animationData={Success} style={style} />
      </div>
    </>
  );
};

export default OrderSuccess;
