import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation hook
import { Button } from "../form";
import CheckOutSteps from "./CheckOutSteps";

const Payment = ({ total }) => {
  const navigate = useNavigate();
  let onSuccesPage = () => {
    navigate("/orderSuccess");
  };
  return (
    <div className="flex justify-center items-center w-full mt-40 800px:mt-20 flex-col">
      <CheckOutSteps active={2} />
      <div onClick={onSuccesPage}>
        <Button text={"Got to order sucess"} className={"!w-60 !bg-black"} />
      </div>
    </div>
  );
};

export default Payment;
