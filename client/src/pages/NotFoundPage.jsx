import React from "react";
import Lottie from "lottie-react";
import NotFound from "../assets/animation/404Page.json";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  const styles = {
    width: 900,
    height: 450,
  };
  return (
    <div className="flex justify-center flex-col items-center">
      <div>
        <Lottie animationData={NotFound} style={styles} />
      </div>
      <p className="text-5xl">OOPS the requested page doesn't exist !!!!</p>
      <Link to={"/products"}>
        <p className="text-5xl mt-8 bg-red-600 px-4 py-2 rounded-lg text-white cursor-pointer">
          Click to Go back to the products page
        </p>
      </Link>
    </div>
  );
};

export default NotFoundPage;
