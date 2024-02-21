import React, { useEffect, useState } from "react";
import DashBoardHeader from "../components/DashBoard/DashBoardHeader";
import DashBoardSideBar from "../components/DashBoard/DashBoardSideBar";
import DashBoardMessages from "../components/DashBoardMessages/DashBoardMessages";
const ShopInboxPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [active, setActive] = useState(8);
  return (
    <div>
      <DashBoardHeader />
      <div className={`flex w-full justify-between items-start`}>
        <div className="w-[90px] 800px:w-[330px]">
          <DashBoardSideBar active={active} setActive={setActive} />
        </div>
        <div className="w-full">
          <DashBoardMessages />
        </div>
      </div>
    </div>
  );
};

export default ShopInboxPage;
