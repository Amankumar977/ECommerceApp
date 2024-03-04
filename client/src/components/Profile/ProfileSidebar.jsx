import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { RxPerson } from "react-icons/rx";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  AiOutlineCreditCard,
  AiOutlineLogout,
  AiOutlineMessage,
} from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

import { MdOutlineTrackChanges } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, []);
  let handleLogoutUser = async () => {
    try {
      let response = await axios.get(
        `${import.meta.env.VITE_SERVER}/user/logout`,
        { withCredentials: true }
      );
      toast.success(response.data.message);
      navigate("/");
      window.location.reload(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8 h-full space-y-20 800px:space-y-14 ">
      <div
        className={`${styles.normalFlex} cursor-pointer w-full mb-8`}
        onClick={() => setActive(1)}>
        <RxPerson size={20} color={active == 1 ? "red" : ""} />

        <span
          className={` pl-3 ${
            active == 1 ? "text-[red]" : ""
          } hidden 800px:block`}>
          Profile
        </span>
      </div>
      <div
        className={`${styles.normalFlex} cursor-pointer w-full mb-8`}
        onClick={() => setActive(2)}>
        <HiOutlineShoppingBag size={20} color={active == 2 ? "red" : ""} />

        <span
          className={` pl-3 ${
            active == 2 ? "text-[red]" : ""
          } hidden 800px:block`}>
          Orders
        </span>
      </div>
      <div
        className={`${styles.normalFlex} cursor-pointer w-full mb-8`}
        onClick={() => setActive(3)}>
        <HiOutlineReceiptRefund size={20} color={active == 3 ? "red" : ""} />

        <span
          className={` pl-3 ${
            active == 3 ? "text-[red]" : ""
          } hidden 800px:block`}>
          Refunds
        </span>
      </div>
      <div
        className={`${styles.normalFlex} cursor-pointer w-full mb-8`}
        onClick={() => setActive(4) || navigate("/inbox")}>
        <AiOutlineMessage size={20} color={active == 4 ? "red" : ""} />
        <span
          className={` pl-3 ${
            active == 4 ? "text-[red]" : ""
          } hidden 800px:block`}>
          Inbox
        </span>
      </div>
      <div
        className={`${styles.normalFlex} cursor-pointer w-full mb-8`}
        onClick={() => setActive(5)}>
        <MdOutlineTrackChanges size={20} color={active == 5 ? "red" : ""} />
        <span
          className={` pl-3 ${
            active == 5 ? "text-[red]" : ""
          } hidden 800px:block`}>
          Track Order
        </span>
      </div>
      <div
        className={`${styles.normalFlex} cursor-pointer w-full mb-8`}
        onClick={() => setActive(6)}>
        <RiLockPasswordLine size={20} color={active == 6 ? "red" : ""} />
        <span
          className={` pl-3 ${
            active == 6 ? "text-[red]" : ""
          } hidden 800px:block`}>
          Change Password
        </span>
      </div>
      <div
        className={`${styles.normalFlex} cursor-pointer w-full mb-8`}
        onClick={() => setActive(7)}>
        <TbAddressBook size={20} color={active == 7 ? "red" : ""} />
        <span
          className={` pl-3 ${
            active == 7 ? "text-[red]" : ""
          } hidden 800px:block`}>
          Address
        </span>
      </div>
      <div
        className={`${styles.normalFlex} cursor-pointer w-full mb-8`}
        onClick={() => {
          setActive(8) || handleLogoutUser();
        }}>
        <AiOutlineLogout size={20} color={active == 8 ? "red" : ""} />
        <span
          className={` pl-3 ${
            active == 8 ? "text-[red]" : ""
          } hidden 800px:block`}>
          Log Out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
