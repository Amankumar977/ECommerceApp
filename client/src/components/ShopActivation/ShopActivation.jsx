import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ShopActivation = () => {
  const { activation_Token } = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function registerShop() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER}/shop/activation`,
          {
            activation_Token,
          }
        );
        const { token } = response.data;
        localStorage.setItem("token", token);
        navigate("/shop-login");
      } catch (error) {
        navigate("/shop-login");
      }
    }

    registerShop();
  }, [activation_Token]);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center font-Poppins text-3xl">
      <p>Your Account has been created successfully</p>
    </div>
  );
};

export default ShopActivation;
