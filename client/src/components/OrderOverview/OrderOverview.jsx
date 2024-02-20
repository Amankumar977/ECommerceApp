import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Layouts/Loader";
import { RiShoppingBag3Fill } from "react-icons/ri";
import styles from "../../styles/styles";
import { RxCross2 } from "react-icons/rx";
import { Label, Input, Button } from "../form/index";
import { toast } from "react-toastify";
const OrderOverview = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openReview, setOpenReview] = useState(false);
  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState(null);
  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER}/orders/getOrderDetails/${id}`
      );
      setOrderData(response.data.order);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const [selectedRating, setSelectedRating] = useState(null);

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
    setRatings(rating);
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!orderData) return null;

  let handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!review || !ratings) {
      return toast.error("Please provide the review and the rating.");
    }
    let products = orderData.products;
    let productId = products.map((items) => items._id);
    let finalReview = {
      productId,
      orderId: orderData._id,
      customerName: orderData.name,
      customerAvatar: orderData.avatar,
      review,
      ratings,
    };
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_SERVER}/orders/submitReview`,
        finalReview,
        { withCredentials: true }
      );
      setOpenReview(false);
      toast.success(response.data.message);
      fetchOrderDetails();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className={`${styles.section} mt-28 800px:mt-4`}>
      {/* Order Details Section */}
      <div className="flex justify-between flex-wrap">
        {/* Order Summary */}
        <div className="my-6">
          <div className="flex gap-2 items-center">
            <RiShoppingBag3Fill size={50} className="text-red-600" />
            <span className="text-2xl">Order Details</span>
          </div>
          <div className="mt-6">Order Id: #{orderData._id}</div>
        </div>

        {/* Order Actions */}
        <div className="my-6">
          {!orderData.reviewGiven &&
          orderData.orderStatus == "Delivered" &&
          orderData.PaymentStatus === "Received" ? (
            <div
              className="bg-red-300 text-red-600 px-1 py-3 cursor-pointer rounded-md font-[600] text-center"
              onClick={() => {
                setOpenReview(true);
              }}>
              Write a review
            </div>
          ) : (
            <Link to={"/profile"}>
              <div className="bg-red-300 text-red-600 px-1 py-3 rounded-md font-[600] text-center">
                Order List
              </div>
            </Link>
          )}
          <div className="mt-6 text-gray-500">
            Placed on: {orderData.createdAt.slice(0, 10)}
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="mt-6">
        {orderData.products.map((item) => (
          <div key={item._id} className="mb-4">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <img src={item.images[0]} alt="" className="w-20" />
                <div>
                  <Link to={`/products/${encodeURIComponent(item.name)}`}>
                    <h1 className="hidden sm:block">{item.name}</h1>
                  </Link>
                  <p className="text-gray-500">
                    ₹ {item.discountedPrice} x {item.quantity}{" "}
                  </p>
                </div>
              </div>
              <div className="text-gray-500">
                ₹ {item.discountedPrice * item.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="w-full mb-1 h-[1px] bg-gray-500"></div>
      <div className="text-right mt-3">
        Total Price: ₹ {orderData.finalPaymentPrice}
      </div>

      {/* Shipping Address and Payment Details */}
      <div className="flex justify-between flex-wrap">
        {/* Shipping Address */}
        <div>
          <div className="font-[600] text-xl mt-4">Shipping Address :</div>
          <div className="space-y-1 text-[20px]">
            <span className="block mt-1">
              {orderData.shippingInfo.houseAddress}
            </span>
            <span className="block">
              {orderData.shippingInfo.city} {orderData.shippingInfo.state}{" "}
              {orderData.shippingInfo.zipCode}
            </span>
            <span className="block">{orderData.shippingInfo.country}</span>
          </div>
        </div>

        {/* Payment Details */}
        <div>
          <div className="font-[600] text-xl mt-4">Payment Details :</div>
          <div className="space-y-2">
            <div className="mt-2">
              Payment Type:{" "}
              <span className="font-[500]">{orderData.PaymentType}</span>
            </div>
            <div>
              Payment Status:{" "}
              <span className="font-[500]">{orderData.PaymentStatus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Status */}
      <div className="w-full mt-2 h-[1px] bg-gray-500"></div>
      <div className="flex justify-between flex-wrap mt-6 text-2xl font-[400] mb-10">
        <div>Order Status :</div>
        <div className="font-[600]">{orderData.orderStatus}</div>
      </div>
      {openReview && (
        <div className="flex fixed top-0 right-0 w-full h-full bg-[#00000031] z-2000 justify-center items-center">
          <div className="bg-white w-[80%] 800px:w-[50%]  h-[70%]   z-50 mt-14">
            <div className=" flex justify-end pr-4 mt-4 ">
              <div onClick={() => setOpenReview(false)}>
                <RxCross2 size={35} className="cursor-pointer" />
              </div>
            </div>
            <form className="mx-6 my-3" onSubmit={handleSubmitReview}>
              <Label
                htmlFor={"review"}
                label={"Write the review"}
                className={"text-3xl"}
              />
              <textarea
                name="review"
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="border border-gray-400 w-full h-[8rem] mt-2 p-2 outline-none"></textarea>
              <br />
              <br />
              <Label
                htmlFor={"ratings"}
                label={"Give the ratings to the products"}
                className={"text-3xl"}
              />
              <div>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <span
                    key={rating}
                    className={`text-6xl cursor-pointer ${
                      rating <= (selectedRating ?? 0) ? "text-yellow-400" : ""
                    }`}
                    onClick={() => handleStarClick(rating)}>
                    {rating <= (selectedRating ?? 0) ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <div>
                <div className="h-[45px] w-full bg-gradient-to-r from-red-400 via-blue-500 to-red-600 mt-6 rounded-lg  "></div>
                <Button
                  type={"submit"}
                  className={
                    " !bg-white border border-red-200 !text-red-600 -mt-[43px] !w-[98.5%] !mx-[2.5px] md:!mx-[4px]"
                  }
                  text={"Submit the ratings"}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderOverview;
