import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import Button from "../form/Button";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";

const ShopInfo = ({ isOwner, id }) => {
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const [shopDetail, setShopDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let getShop = async () => {
      try {
        setLoading(true);
        let response = await axios.get(
          `${import.meta.env.VITE_SERVER}/shop/shopPreview/${id}`
        );
        setShopDetail(response.data.shop);
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    getShop();
  }, []);

  const sellerShop = seller?.shop || {}; // Handling for null seller

  let handleLogout = () => {
    if (!Cookies.remove("ShopToken")) {
      toast.success("Logout successful");
      window.location.reload(true);
      return;
    }
    toast.error("Error in logging out");
  };

  return (
    !loading && (
      <div className="w-full py-5 px-3">
        <div className={`${styles.normalFlex} w-full justify-center`}>
          <img
            src={`${sellerShop.avatar || shopDetail.avatar}`}
            alt={sellerShop.name || shopDetail.name}
            className="w-[140px] h-[140px] object-contain rounded-full"
          />
        </div>
        <h3 className="text-center py-2 text-3xl font-[600] mt-3">
          {sellerShop.name || shopDetail.name}
        </h3>
        <p className="text-[16px] text-black ">
          {sellerShop.description || shopDetail.description || ""}
        </p>
        <div className="mt-2">
          <p className="font-[600] py-[2px] text-[15px] ">Address</p>
          <h4>
            {sellerShop.address || shopDetail.address}{" "}
            {sellerShop.zip || shopDetail.zip}
          </h4>
        </div>
        <div className="mt-2">
          <p className="font-[600] py-[2px] text-[15px] ">Phone Number</p>
          <h4>{sellerShop.phone || shopDetail.phone}</h4>
        </div>
        <div className="mt-2">
          <p className="font-[600] py-[2px] text-[15px] ">Total Products</p>
          <p>{products?.length}</p>
        </div>
        <div className="mt-2">
          <p className="font-[600] py-[2px] text-[15px] ">Shop rating</p>
          <p>4.5/5</p>
        </div>
        <div className="mt-2">
          <p className="font-[600] py-[2px] text-[15px]">Joined On</p>
          <p>
            {sellerShop.createdAt?.slice(0, 10) ||
              shopDetail.createdAt?.slice(0, 10)}
          </p>
        </div>
        {isOwner && (
          <>
            <Button
              className={"mt-4 !bg-black text-white"}
              text={"Edit Shop"}
            />
            <div
              onClick={() => {
                handleLogout();
              }}>
              <Button
                className={"mt-4 !bg-black text-white"}
                text={"Log Out"}
              />
            </div>
          </>
        )}
      </div>
    )
  );
};

export default ShopInfo;
