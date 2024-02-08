import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import Logo from "../../assets/peopely.png";
const DashBoardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/dashboard">
          <img src={Logo} alt={"peopely"} className="w-16" />
        </Link>
      </div>
      <div className={` flex items-center`}>
        <div className={`${styles.normalFlex} mr-4`}>
          <div className={` 800px:flex items-center hidden`}>
            <Link to={"/dashboard/coupons"}>
              <AiOutlineGift
                size={30}
                color="#555"
                className="mx-5 cursor-pointer "
                title="Coupon code"
              />
            </Link>
            <Link to={"/dashboard/events"}>
              <MdOutlineLocalOffer
                size={30}
                color="#555"
                className="mx-5 cursor-pointer "
                title="Events page"
              />
            </Link>
            <Link to={"/dashboard/products"}>
              <FiShoppingBag
                size={30}
                color="#555"
                className="mx-5 cursor-pointer "
                title="All products"
              />
            </Link>
            <Link to={"/dashboard/orders"}>
              <FiPackage
                size={30}
                color="#555"
                className="mx-5 cursor-pointer "
                title="All Orders"
              />
            </Link>
            <Link to={"/dashboard/messages"}>
              <BiMessageSquareDetail
                size={30}
                color="#555"
                className="mx-5 cursor-pointer "
                title="View customers message"
              />
            </Link>
          </div>
          <Link to={`/shopHome/${seller.shop._id}`}>
            <img
              src={`${import.meta.env.VITE_BACKEND_LINK}/${seller.shop.avatar}`}
              alt={seller.shop.name}
              className="w-12 h-12 rounded-full object-contain"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashBoardHeader;
