import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation hook
import { Button, Input, Label } from "../form";
import CheckOutSteps from "./CheckOutSteps";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";
const Payment = ({ total }) => {
  const { cart } = useSelector((state) => state.cart);
  const [latestOrder, setLatestOrder] = useState(
    localStorage.getItem("latestOrder")
      ? JSON.parse(localStorage.getItem("latestOrder"))
      : []
  );
  const [select, setSelect] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const navigate = useNavigate();
  console.log(latestOrder);
  let handleMakePaymentWithStripe = async () => {
    const stripe = await loadStripe(
      `${import.meta.env.VITE_STRIPE_PUBLISH_KEY}`
    );

    const products = {
      products: cart,
      discountedPercentage: Math.min(
        Math.round(
          (latestOrder.discount / latestOrder.finalPaymentPrice) * 100
        ),
        100
      ),
    };

    const headers = {
      "Content-type": "application/json",
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/payment/StripeCheckoutSession`,
        products, // Pass the body directly, no need for an object wrapper
        {
          headers,
        }
      );
      const session = response.data; // No need for .json(), axios handles JSON parsing
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full mt-24 800px:mt-20 flex-col  ">
      <CheckOutSteps active={2} />
      <div className="md:flex justify-evenly md:gap-6  my-4 md:w-[100%]">
        <div className="bg-white px-6 py-3 md:px-10 md:py-4  my-3 mx-2 md:w-[50%] lg:w-[60%] rounded-lg">
          <div className="flex gap-4 mb-6 font-[400]">
            <input
              type="radio"
              name="pay"
              id="pay"
              onClick={() => setSelect(1)}
              className="w-5"
            />
            <Label label={"Pay with credit/debit card"} />
          </div>
          {select == 1 && (
            <div onClick={handleMakePaymentWithStripe}>
              <Button
                className={"mt-4 !bg-[#ff2067] !w-44 !text-white"}
                text={"Pay Now"}
              />
            </div>
          )}
          <div className="flex gap-4 mb-6 font-[400] mt-7">
            <input type="radio" name="pay" id="pay" />
            <Label label={"Pay with UPI"} />
          </div>
          <div className="flex gap-4 font-[400]">
            <input type="radio" name="pay" id="pay" />
            <Label label={"Cash on delivery"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
