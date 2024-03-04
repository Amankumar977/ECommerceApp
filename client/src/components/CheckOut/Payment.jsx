import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation hook
import { Button, Input, Label } from "../form";
import CheckOutSteps from "./CheckOutSteps";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../redux/reducers/cart";
import axios from "axios";
const Payment = ({ total }) => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [select, setSelect] = useState(0);
  const [latestOrder, setLatestOrder] = useState(
    localStorage.getItem("latestOrder")
      ? JSON.parse(localStorage.getItem("latestOrder"))
      : []
  );
  const productsId = cart.map((item) => {
    return item._id;
  });

  const handleMakePaymentWithStripe = async () => {
    let orderDetails = {
      products: productsId,
      name: latestOrder.name,
      email: latestOrder.email,
      shippingInfo: latestOrder.shippingInfo, // Corrected typo
      phoneNumber: latestOrder.phoneNumber,
      finalPaymentPrice: latestOrder.finalPaymentPrice,
      discount: latestOrder.discount,
      shippingCharges: latestOrder.shippingCharges,
      customerId: user._id,
      PaymentType: "COD",
    };
    try {
      const stripe = await loadStripe(
        `${import.meta.env.VITE_STRIPE_PUBLISH_KEY}`
      );
      const products = {
        products: cart,
        orderDetails: orderDetails,
        discountedPercentage:
          Math.min(
            Math.round(
              (latestOrder.discount / latestOrder.finalPaymentPrice) * 100
            ),
            100
          ) || 0.01,
      };

      const headers = {
        "Content-type": "application/json",
      };

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER}/payment/StripeCheckoutSession`,
        products,
        { headers }
      );

      const session = response.data;
      const result = await stripe.redirectToCheckout({ sessionId: session.id });

      if (result.error) {
        console.error(result.error);
        throw new Error("Stripe redirection error");
      }
    } catch (error) {
      console.error("Error making payment:", error.message);
    }
  };

  let handleMakePaymentWithRazorpay = async () => {
    let orderDetails = {
      products: cart,
      name: latestOrder.name,
      email: latestOrder.email,
      shippingInfo: latestOrder.shippingInfo, // Corrected typo
      phoneNumber: latestOrder.phoneNumber,
      finalPaymentPrice: latestOrder.finalPaymentPrice,
      discount: latestOrder.discount,
      shippingCharges: latestOrder.shippingCharges,
      customerId: user._id,
      avatar: latestOrder.avatar,
      PaymentType: "UPI",
    };
    try {
      const {
        data: { order },
      } = await axios.post(
        `${import.meta.env.VITE_SERVER}/payment/razorpayPayment`,
        {
          finalPaymentPrice: latestOrder.finalPaymentPrice,
          orderDetails: orderDetails,
        }
      );

      var options = {
        key: `${import.meta.env.VITE_RAZORPAY_KEY_ID}`,
        amount: order.amount,
        currency: "INR",
        name: "Peopely",
        description: "People's store",
        order_id: order.id,
        callback_url: `${
          import.meta.env.VITE_SERVER
        }/payment/razorpayPaymentVerification`,
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phoneNumber,
        },
        notes: {
          address: "New Delhi, Delhi rocks, 11100014",
        },
        theme: {
          color: "#FF837A",
        },
      };
      const razorPay = new window.Razorpay(options);
      razorPay.open();
    } catch (error) {
      console.error("Error initiating Razorpay payment:", error);
    }
  };
  let handleCashOnDelivery = async () => {
    let orderDetails = {
      products: cart,
      name: latestOrder.name,
      email: latestOrder.email,
      shippingInfo: latestOrder.shippingInfo, // Corrected typo
      phoneNumber: latestOrder.phoneNumber,
      finalPaymentPrice: latestOrder.finalPaymentPrice,
      discount: latestOrder.discount,
      shippingCharges: latestOrder.shippingCharges,
      customerId: user._id,
      avatar: latestOrder.avatar,
      PaymentType: "COD",
    };
    try {
      await axios
        .post(`${import.meta.env.VITE_SERVER}/orders/createOrder`, orderDetails)
        .then((response) => {
          console.log(response.data.message);
          navigate("/orderSuccess");
        });
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center w-full mt-24 800px:mt-20 flex-col  ">
      <CheckOutSteps active={2} />
      <div className="flex justify-center md:gap-6  my-4 w-full">
        <div className="bg-white px-6 py-3 md:px-10 md:py-4  my-3 mx-2 w-[70%]  rounded-lg">
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
          {/** handleMakePaymentWithRazorpay*/}
          <div className="flex gap-4 mb-6 font-[400] mt-4">
            <input
              type="radio"
              name="pay"
              id="pay"
              onClick={() => setSelect(2)}
              className="w-5"
            />
            <Label label={"Pay with UPI"} />
          </div>
          {select == 2 && (
            <div onClick={handleMakePaymentWithRazorpay} className="mb-4">
              <Button
                className={"mt-6 !bg-[#ff2067] !w-44 !text-white"}
                text={"Pay Now with UPI"}
              />
            </div>
          )}

          <div className="flex gap-4 mb-6 font-[400] mt-4">
            <input
              type="radio"
              name="pay"
              id="pay"
              onClick={() => setSelect(3)}
              className="w-5"
            />
            <Label label={"Cash On delivery"} />
          </div>
          {select == 3 && (
            <div onClick={handleCashOnDelivery} className="mb-4">
              <Button
                className={"mt-6 !bg-[#ff2067] !w-44 !text-white h-[50px] "}
                text={"Book Cash on delivery"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
