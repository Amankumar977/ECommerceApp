import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../Layouts/Loader";
import { RiShoppingBag3Fill } from "react-icons/ri";
import styles from "../../styles/styles";
import { toast } from "react-toastify";

const ShopOrderOverView = () => {
  const { id } = useParams();

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

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

    fetchOrderDetails();
  }, [id]);

  const handleStatusChange = async (e) => {
    let selectedStatus = e.target.value;
    if (selectedStatus === "On Its way") {
      selectedStatus = "onItsWay";
    }

    try {
      let response = await axios.patch(
        `${import.meta.env.VITE_SERVER}/orders/updatedOrderStatus`,
        { selectedStatus, id: id },
        { withCredentials: true }
      );
      toast.success(response.data.message);
      window.location.reload(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!orderData) return null;

  let orderStatus = [];

  if (orderData.orderStatus === "Ordered") {
    orderStatus.push("Shipped");
  } else if (orderData.orderStatus === "Shipped") {
    orderStatus.push("On Its way");
  } else if (orderData.orderStatus === "onItsWay") {
    orderStatus.push("Delivered");
  }

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
          <Link to={"/dashboard/orders"}>
            <div className="bg-red-300 text-red-600 px-1 py-3 rounded-md font-[600] text-center">
              Order List
            </div>
          </Link>
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
      {/**Change orders status */}
      <div className="mb-10">
        {orderStatus.length === 1 && (
          <>
            <div className="text-4xl  mb-2">Change order status</div>

            <select
              className="w-full bg-gray-500 rounded-lg px-2 py-3 text-white"
              onChange={(e) => handleStatusChange(e)}>
              <option value="Select">Select the order status</option>
              {orderStatus.map((status) => (
                <option value={status} key={status}>
                  {status}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </div>
  );
};

export default ShopOrderOverView;
