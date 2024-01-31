import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Activation = () => {
  const { activation_Token } = useParams();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (activation_Token) {
      const activateUser = async () => {
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_SERVER}/user/activation`,
            { activation_Token }
          );
          console.log(res.data.message);
          navigate("/");
        } catch (error) {
          setError(true);
        }
      };
      activateUser();
    }
  }, [activation_Token]);
  return (
    <div className="w-full h-[100vh] flex justify-center items-center font-Poppins text-3xl">
      {error ? (
        <div>
          <p className="mb-8 text-center">Your token is expired !!</p>
          <p>Please try to Register again.</p>
        </div>
      ) : (
        <p>Your Account has been created successfully</p>
      )}
    </div>
  );
};

export default Activation;
