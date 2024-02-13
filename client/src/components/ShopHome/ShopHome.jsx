import React, { useEffect } from "react";
import styles from "../../styles/styles.js";
import ShopInfo from "../ShopInfo/ShopInfo";
import ShopProfileData from "../ShopProfileData/ShopProfileData";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/reducers/products.js";
const ShopHome = () => {
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(seller.shop._id));
  }, [dispatch]);
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex py-10 justify-between">
        <div className="w-[35%] 800px:w-[25%] bg-white rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          <ShopInfo isOwner={true} />
        </div>
        <div className="w-[65%] 800px:w-[75%] rounded-md">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHome;
