import React, { useEffect } from "react";
import DashBoardHeader from "../components/DashBoard/DashBoardHeader";
import DashBoardSideBar from "../components/DashBoard/DashBoardSideBar";
import AllProducts from "../components/AllProducts/AllProducts";
const AllProductsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <DashBoardHeader />
      <div className={`flex justify-between w-full`}>
        <div className="w-[80px] 800px:w-[330px]">
          <DashBoardSideBar active={3} />
        </div>
        <div className="w-full justify-center flex">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
