import React, { useEffect, useState } from "react";
import DashBoardHeader from "../components/DashBoard/DashBoardHeader";
import DashBoardSideBar from "../components/DashBoard/DashBoardSideBar";
import Coupon from "../components/coupon/Coupon";
import { Button } from "@mui/material";
import CreateCouponBox from "../components/coupon/CreateCouponBox";
import styles from "../styles/styles.js";
const CouponPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [openCreateBox, setOpenCreateBox] = useState(false);
  return (
    <div>
      <DashBoardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[90px] 800px:w-[330px]">
          <DashBoardSideBar active={9} />
        </div>
        <div className="w-full">
          <div className="m-3 flex justify-between items-center">
            <div className={`${styles.heading}`}>Coupons Page</div>
            <div className="text-right ">
              <Button
                className={`${styles.button} !bg-black !text-white !font-mono `}
                onClick={() => setOpenCreateBox(!openCreateBox)}>
                Create coupon
              </Button>
            </div>
          </div>
          <Coupon />
        </div>
      </div>
      {openCreateBox && <CreateCouponBox setOpenCreateBox={setOpenCreateBox} />}
    </div>
  );
};

export default CouponPage;
