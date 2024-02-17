import React, { useEffect, useState } from "react";
import DashBoardHeader from "../components/DashBoard/DashBoardHeader";
import DashBoardSideBar from "../components/DashBoard/DashBoardSideBar";
import styles from "../styles/styles.js";
const DashBoardPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [active, setActive] = useState(1);
  return (
    <div>
      <DashBoardHeader />
      <div className={`${styles.normalFlex} justify-between w-full`}>
        <div className="w-[90px] 800px:w-[330px]">
          <DashBoardSideBar active={active} setActive={setActive} />
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
