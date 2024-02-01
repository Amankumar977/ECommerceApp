import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";
import HeroImg from "../../../assets/hero.jpg";
const Hero = () => {
  return (
    <div
      className={`${styles.normalFlex} relative min-h-[70vh] 800px:min-h-[80vh] mt-0 w-full bg-cover bg-no-repeat font-Poppins `}
      style={{
        backgroundImage: `url(${HeroImg})`,
      }}>
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1 className="text-[35px] leading-[1.2] 800px:text-[60px] text-[#747373] font-[600] capitalize">
          Collection's that suits <br /> your smile.
        </h1>
        <p className="pt-5 text-2xl  font-[400] text-[#2c2c2aba]">
          "Discover joy in every purchase! Our curated collection brings smiles
          to your face. Elevate your shopping experience with products that
          celebrate happiness. Unbox delight with every order at Peopely!"
        </p>
        <Link to="/products">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] text-1xl ">Shop Now</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
