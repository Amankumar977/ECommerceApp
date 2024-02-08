import React from "react";
import Lottie from "lottie-react";
import LoaderAnimate from "../../assets/animation/Loader.json";
const Loader = () => {
  const style = {
    height: 400,
    width: 400,
  };
  const interactivity = {
    mode: "scroll",
    actions: [
      {
        visibility: [0, 0.2],
        type: "stop",
        frames: [0],
      },
      {
        visibility: [0.2, 0.45],
        type: "seek",
        frames: [0, 45],
      },
      {
        visibility: [0.45, 1.0],
        type: "loop",
        frames: [45, 60],
      },
    ],
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie
        animationData={LoaderAnimate}
        style={style}
        autoPlay={true}
        loop={true}
        interactivity={interactivity}
      />
    </div>
  );
};

export default Loader;
