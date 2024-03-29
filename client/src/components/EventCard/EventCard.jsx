import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import CountDown from "../../CountDown/CountDown.jsx";
import axios from "axios";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/reducers/cart.js";
import { toast } from "react-toastify";

const EventCard = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    try {
      let getAllEvents = async () => {
        let response = await axios.get(
          `${import.meta.env.VITE_SERVER}/events/getAllEvents`
        );
        setData(response.data.events);
      };
      getAllEvents();
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, []);

  let handleAddToCart = (data) => {
    const doesItemExist = cart && cart.find((item) => item._id === data._id);
    if (doesItemExist) {
      return toast.error(
        `${data.name.slice(0, 10)} is already present in the cart`
      );
    }
    const item = { ...data, quantity: 1 };
    dispatch(addToCart(item));
    toast.success(`${data.name.slice(0, 10)} added to the cart`);
  };

  return (
    <>
      {data.length > 0 &&
        data.map((event) => (
          <div
            className={`w-full  bg-white rounded-lg lg:flex p-2 ${
              isTimeUp ? "hidden" : "block"
            } `}
            key={event._id}>
            <div className="w-full lg:w-[50%] m-auto">
              <img src={event.images[0]} alt={event.description} />
            </div>
            <div className="w-full lg:w-[50%] flex flex-col justify-center">
              <h2 className={`${styles.productTitle}`}>{event.name}</h2>
              <p className="mt-2">{event.description}</p>
              <div className="flex py-2 justify-between ">
                <div className="flex">
                  <h5 className="font-[500] text-[18px]  pr-3 ">
                    {event.originalPrice
                      ? event.originalPrice
                      : event.discountedPrice}{" "}
                    ₹
                  </h5>
                  <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                    {event.originalPrice ? event.discountedPrice : null} ₹
                  </h5>
                </div>
                <span className="text-green-600 pr-4 font-[400] text-[17px]">
                  {event.sold_out} sold
                </span>
              </div>
              <CountDown
                startDate={event.startDate}
                endDate={event.endDate}
                setIsTimeUp={setIsTimeUp}
              />
              <div
                className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                onClick={() => {
                  handleAddToCart(event);
                }}>
                <span className="text-[#fff] flex items-center justify-center">
                  Add to cart <AiOutlineShoppingCart className="ml-1" />
                </span>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default EventCard;
