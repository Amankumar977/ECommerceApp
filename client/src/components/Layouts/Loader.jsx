import React from "react";
import Lottie from "lottie-react";
import LoaderAnimate from "../../assets/animation/Loader.json";
const Loader = () => {
  const style = {
    height: 400,
    width: 400,
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie animationData={LoaderAnimate} style={style} />
    </div>
  );
};

export default Loader;
