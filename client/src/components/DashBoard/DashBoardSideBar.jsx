import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { VscNewFile } from "react-icons/vsc";
import { BiMessageSquareDetail } from "react-icons/bi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { HiOutlineReceiptRefund } from "react-icons/hi";
const DashBoardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      <div className={`${styles.normalFlex} w-full p-4`}>
        <Link to={"/dashboard"} className={`${styles.normalFlex} w-full`}>
          <RxDashboard
            size={30}
            color={`${active == 1 ? "#f13f3f" : "#555"}`}
          />
          <h5
            className={`${
              active == 1 ? "text-[red]" : "text-[#555]"
            } pl-2 text-lg foont-[400] 800px:block hidden `}>
            Dashboard
          </h5>
        </Link>
      </div>
      <div className={`${styles.normalFlex} w-full p-4`}>
        <Link
          to={"/dashboard/orders"}
          className={`${styles.normalFlex} w-full`}>
          <FiPackage size={30} color={`${active == 2 ? "#f13f3f" : "#555"}`} />
          <h5
            className={`${
              active == 2 ? "text-[red]" : "text-[#555]"
            } pl-2 text-lg foont-[400] 800px:block hidden `}>
            All Orders
          </h5>
        </Link>
      </div>
      <div className={`${styles.normalFlex} w-full p-4`}>
        <Link
          to={"/dashboard/products"}
          className={`${styles.normalFlex} w-full`}>
          <FiShoppingBag
            size={30}
            color={`${active == 3 ? "#f13f3f" : "#555"}`}
          />
          <h5
            className={`${
              active == 3 ? "text-[red]" : "text-[#555]"
            } pl-2 text-lg foont-[400] 800px:block hidden `}>
            All Products
          </h5>
        </Link>
      </div>
      <div className={`${styles.normalFlex} w-full p-4`}>
        <Link
          to={"/dashboard/create-products"}
          className={`${styles.normalFlex} w-full`}>
          <AiOutlineFolderAdd
            size={30}
            color={`${active == 4 ? "#f13f3f" : "#555"}`}
          />
          <h5
            className={`${
              active == 4 ? "text-[red]" : "text-[#555]"
            } pl-2 text-lg foont-[400] 800px:block hidden `}>
            Create Product
          </h5>
        </Link>
      </div>
      <div className={`${styles.normalFlex} w-full p-4`}>
        <Link
          to={"/dashboard/events"}
          className={`${styles.normalFlex} w-full`}>
          <MdOutlineLocalOffer
            size={30}
            color={`${active == 5 ? "#f13f3f" : "#555"}`}
          />
          <h5
            className={`${
              active == 5 ? "text-[red]" : "text-[#555]"
            } pl-2 text-lg foont-[400] 800px:block hidden `}>
            All Events
          </h5>
        </Link>
      </div>
      <div className={`${styles.normalFlex} w-full p-4`}>
        <Link
          to={"/dashboard/create-events"}
          className={`${styles.normalFlex} w-full`}>
          <VscNewFile size={30} color={`${active == 6 ? "#f13f3f" : "#555"}`} />
          <h5
            className={`${
              active == 6 ? "text-[red]" : "text-[#555]"
            } pl-2 text-lg foont-[400] 800px:block hidden`}>
            Create Events
          </h5>
        </Link>
      </div>
      <div className={`${styles.normalFlex} w-full p-4`}>
        <Link
          to={"/dashboard/withdraw-money"}
          className={`${styles.normalFlex} w-full`}>
          <CiMoneyBill
            size={30}
            color={`${active == 7 ? "#f13f3f" : "#555"}`}
          />
          <h5
            className={`${
              active == 7 ? "text-[red]" : "text-[#555]"
            } pl-2 text-lg foont-[400] 800px:block hidden`}>
            Withdraw Money
          </h5>
        </Link>
      </div>
      <div className={`${styles.normalFlex} w-full p-4`}>
        <Link
          to={"/dashboard/messages"}
          className={`${styles.normalFlex} w-full`}>
          <BiMessageSquareDetail
            size={30}
            color={`${active == 8 ? "#f13f3f" : "#555"}`}
          />
          <h5
            className={`${
              active == 8 ? "text-[red]" : "text-[#555]"
            } pl-2 text-lg foont-[400] 800px:block hidden `}>
            All Mesages
          </h5>
        </Link>
      </div>
      <div className={`${styles.normalFlex} w-full p-4`}>
        <Link
          to={"/dashboard/coupons"}
          className={`${styles.normalFlex} w-full`}>
          <AiOutlineGift
            size={30}
            color={`${active == 9 ? "#f13f3f" : "#555"}`}
          />
          <h5
            className={`${
              active == 9 ? "text-[red]" : "text-[#555]"
            } pl-2 text-lg foont-[400] 800px:block hidden `}>
            Coupon Codes
          </h5>
        </Link>
      </div>
      <div className={`${styles.normalFlex} w-full p-4`}>
        <Link
          to={"/dashboard/refunds"}
          className={`${styles.normalFlex} w-full`}>
          <HiOutlineReceiptRefund
            size={30}
            color={`${active == 10 ? "#f13f3f" : "#555"}`}
          />
          <h5
            className={`${
              active == 10 ? "text-[red]" : "text-[#555]"
            } pl-2 text-lg foont-[400] 800px:block hidden`}>
            Refunds
          </h5>
        </Link>
      </div>
      <div className={`${styles.normalFlex} w-full p-4`}>
        <Link
          to={"/dashboard/refunds"}
          className={`${styles.normalFlex} w-full`}>
          <CiSettings
            size={30}
            color={`${active == 11 ? "#f13f3f" : "#555"}`}
          />
          <h5
            className={`${
              active == 11 ? "text-[red]" : "text-[#555]"
            } pl-2 text-lg foont-[400] 800px:block hidden `}>
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashBoardSideBar;
