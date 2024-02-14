import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import Button from "../form/Button";
import { useDispatch, useSelector } from "react-redux";
import { getShopEvents } from "../../redux/reducers/events";
import CountDown from "../../CountDown/CountDown";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/reducers/cart";
const ShopProfileData = ({ isOwner, id }) => {
  const { cart } = useSelector((state) => state.cart);
  const [active, setActive] = useState(1);
  const { products } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const { events } = useSelector((state) => state.events);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShopEvents(seller?.shop?._id || id));
  }, []);
  let handleAddToCart = (data) => {
    const doesItemExist = cart && cart.find((item) => item._id === data._id);
    if (doesItemExist) {
      return toast.error("The item is alredy in the cart");
    }
    const item = { ...data, quantity: 1 };
    dispatch(addToCart(item));
    return toast.success("The item is added to the cart");
  };
  return (
    <div className="w-full p-2 font-mono ">
      <div className="flex items-center gap-[20px] justify-between">
        <div className="flex  gap-[20px] flex-wrap">
          <div className={`${styles.normalFlex}`}>
            <h5
              className={`font-[600] text-[20px] cursor-pointer  ${
                active == 1 ? "text-red-500" : "text-[#555]"
              }`}
              onClick={() => {
                setActive(1);
              }}>
              Shop Products
            </h5>
          </div>
          <div className={`${styles.normalFlex}`}>
            <h5
              className={`font-[600] text-[20px] cursor-pointer ${
                active == 2 ? "text-red-500" : "text-[#555]"
              }`}
              onClick={() => {
                setActive(2);
              }}>
              Running events
            </h5>
          </div>
          <div className={`${styles.normalFlex}`}>
            <h5
              className={`font-[600] text-[20px] cursor-pointer  ${
                active == 3 ? "text-red-500" : "text-[#555]"
              }`}
              onClick={() => {
                setActive(3);
              }}>
              Shop Reviews
            </h5>
          </div>
        </div>
        {!isOwner && (
          <Link to="/products">
            <Button
              className={`${styles.button} !bg-black text-white`}
              text={"Go to All Products"}
            />
          </Link>
        )}
        {isOwner && (
          <Link to="/dashboard">
            <Button
              className={`${styles.button} !bg-black text-white`}
              text={"Go to dashbaord"}
            />
          </Link>
        )}
      </div>

      <br />
      <div className="grid grid-cols-1 gap-[20px] md:grid-col-2 md:gap-[25px] lg:grid-cols-3 xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
        {active == 1 &&
          products &&
          products.map((data) => (
            <ProductCard data={data} alt={data.name} key={data._id} />
          ))}
      </div>
      <br />
      <div>
        {active == 2 &&
          events &&
          events.map((data) => (
            <div key={data._id} className="flex  w-full">
              <div className="w-[50%]">
                <img src={data.images[0]} alt={data.description} />
              </div>
              <div className="w-[50%]">
                <h1 className={`${styles.heading} font-mono text-4xl`}>
                  {data.name}
                </h1>
                <article>
                  <p>{data.description.slice(0, 400)}</p>
                </article>
                <div className="flex justify-between items-center pt-3 mb-6">
                  <div className="flex gap-2">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      ₹{data.discountedPrice}
                    </h4>
                    <h4 className={`${styles.price}`}>
                      ₹ {data.originalPrice}
                    </h4>
                  </div>
                  <div>
                    <h3 className={`text-red-600`}>
                      ({data.sold_out}) items sold
                    </h3>
                  </div>
                </div>
                <CountDown startDate={data.startDate} endDate={data.endDate} />
                {!isOwner && (
                  <div
                    className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                    onClick={() => {
                      handleAddToCart(data);
                    }}>
                    <span className="text-[#fff] flex items-center justify-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShopProfileData;
