import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleGetUserOrder } from "../../redux/reducers/orders";
import axios from "axios";
import Loader from "../Layouts/Loader";
const TrackOrder = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
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
  }, []);
  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;
  if (!orderData) return null;
  return (
    <div className="flex justify-center items-center m-20 w-full text-6xl">
      The order is {orderData.orderStatus}
    </div>
  );
};

export default TrackOrder;
