import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import Button from "../form/Button";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const ShopInfo = ({ isOwner }) => {
  const { isSellerAuthenticated, seller } = useSelector(
    (state) => state.seller
  );
  let handleLogout = () => {
    if (!Cookies.remove("ShopToken")) {
      toast.success("Logout succesful");
      window.location.reload(true);
      return;
    }
    toast.error("Error in logging out");
  };
  return (
    <div className="w-full py-5 px-3">
      <div className={`${styles.normalFlex} w-full justify-center`}>
        <img
          src={`${seller.shop.avatar}`}
          alt={seller.shop.name}
          className="w-[140px] h-[140px] object-contain rounded-full"
        />
      </div>
      <h3 className="text-center py-2 text-3xl font-[600] mt-3">
        {seller.shop.name}
      </h3>
      <p className="text-[16px] text-black ">
        {seller.shop.description ||
          "The Shop Details provide a better a way to understand the shop, Please write it."}
      </p>
      <div className="mt-2">
        <p className="font-[600] py-[2px] text-[15px] ">Address</p>
        <h4>
          {seller.shop.address} {seller.shop.zip}
        </h4>
      </div>
      <div className="mt-2">
        <p className="font-[600] py-[2px] text-[15px] ">Phone Number</p>
        <h4>{seller.shop.phone}</h4>
      </div>
      <div className="mt-2">
        <p className="font-[600] py-[2px] text-[15px] ">Total Products</p>
        <p>10</p>
      </div>
      <div className="mt-2">
        <p className="font-[600] py-[2px] text-[15px] ">Shop rating</p>
        <p>4.5/5</p>
      </div>
      <div className="mt-2">
        <p className="font-[600] py-[2px] text-[15px]">Joined On</p>
        <p>{seller.shop.createdAt.slice(0, 10)}</p>
      </div>
      {isOwner && (
        <>
          <Button className={"mt-4 !bg-black text-white"} text={"Edit Shop"} />
          <div
            onClick={() => {
              handleLogout();
            }}>
            <Button className={"mt-4 !bg-black text-white"} text={"Log Out"} />
          </div>
        </>
      )}
    </div>
  );
};

export default ShopInfo;
