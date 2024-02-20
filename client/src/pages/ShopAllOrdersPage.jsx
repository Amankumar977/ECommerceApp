import React, { useEffect } from "react";
import DashBoardHeader from "../components/DashBoard/DashBoardHeader";
import DashBoardSideBar from "../components/DashBoard/DashBoardSideBar";
import ShopAllOrder from "../components/ShopAllOrder";
const ShopAllOrdersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <DashBoardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[90px] 800px:w-[330px]">
          <DashBoardSideBar active={2} />
        </div>
        <div className=" w-full ">
          <ShopAllOrder />
        </div>
      </div>
    </div>
  );
};

export default ShopAllOrdersPage;
