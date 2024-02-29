import React, { useEffect, useState } from "react";
import Header from "../components/Layouts/Header";
import { LuLayoutDashboard } from "react-icons/lu";
import { FiShoppingBag } from "react-icons/fi";
import { CiShop } from "react-icons/ci";
import { MdPeople } from "react-icons/md";
import { SiEventstore } from "react-icons/si";
import { RiCoupon3Line } from "react-icons/ri";
import { IoIosPhonePortrait } from "react-icons/io";
import AdminDashboardMain from "../components/AdminDashboardMain/AdminDashboardMain.jsx";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Layouts/Loader";
import { getAllData } from "../redux/reducers/adminData.js";

const AdminDashboard = () => {
  const [openAdminbar, setOpenAdminbar] = useState(true);
  const { user } = useSelector((state) => state.user);
  const { adminDataloading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllData(user?._id));
  }, []);
  const [active, setActive] = useState(7);
  if (adminDataloading) {
    return <Loader />;
  }
  return (
    <div>
      <Header
        isAdmin={true}
        setOpenAdminbar={setOpenAdminbar}
        openAdminbar={openAdminbar}
      />
      <div className="flex w-full h-[100%]">
        {/* Apply dynamic width and visibility to the sidebar based on the 'openAdminbar' state */}
        <div
          className={`bg-white shadow-lg px-3 space-y-14 ${
            openAdminbar
              ? "w-[35%] 800px:w-[15%] transform translate-x-0 ease-out duration-500"
              : "w-[0] transform -translate-x-full ease-in duration-500"
          }`}
          style={{ visibility: openAdminbar ? "visible" : "hidden" }}>
          <div
            className={`${
              active === 1 ? "bg-gray-300" : "bg-gray-50"
            } mt-2 px-1 py-2 rounded-md text-[#131413] flex gap-2 items-center cursor-pointer text-sm sm:text-[17px]`}
            onClick={() => setActive(1)}>
            <LuLayoutDashboard /> Dash Board
          </div>
          <div
            className={`${
              active === 2 ? "bg-gray-300" : "bg-gray-50"
            } mt-2 px-1 py-2 rounded-md text-[#131413] flex gap-2 items-center cursor-pointer text-sm sm:text-[17px]`}
            onClick={() => setActive(2)}>
            <FiShoppingBag /> All Orders
          </div>
          <div
            className={`${
              active === 3 ? "bg-gray-300" : "bg-gray-50"
            } mt-2 px-1 py-2 rounded-md text-[#131413] flex gap-2 items-center cursor-pointer text-sm sm:text-[17px]`}
            onClick={() => setActive(3)}>
            <CiShop /> All Shops
          </div>
          <div
            className={`${
              active === 4 ? "bg-gray-300" : "bg-gray-50"
            } mt-2 px-1 py-2 rounded-md text-[#131413] flex gap-2 items-center cursor-pointer text-[12px] sm:text-[17px]`}
            onClick={() => setActive(4)}>
            <MdPeople /> All Customers
          </div>
          <div
            className={`${
              active === 5 ? "bg-gray-300" : "bg-gray-50"
            } mt-2 px-1 py-2 rounded-md text-[#131413] flex gap-2 items-center cursor-pointer text-[12px] sm:text-[17px]`}
            onClick={() => setActive(5)}>
            <IoIosPhonePortrait /> All Products
          </div>
          <div
            className={`${
              active === 6 ? "bg-gray-300" : "bg-gray-50"
            } mt-2 px-1 py-2 rounded-md text-[#131413] flex gap-2 items-center cursor-pointer text-[12px] sm:text-[17px]`}
            onClick={() => setActive(6)}>
            <SiEventstore /> All Events
          </div>
          <div
            className={`${
              active === 7 ? "bg-gray-300" : "bg-gray-50"
            } mt-2 px-1 py-2 rounded-md text-[#131413] cursor-pointer flex gap-2 items-center text-[12px] sm:text-[17px]`}
            onClick={() => setActive(7)}>
            <RiCoupon3Line /> All Coupons
          </div>
        </div>
        {/* Expand to fill remaining width when sidebar is closed */}
        <div className="w-full">
          {!adminDataloading && <AdminDashboardMain active={active} />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
