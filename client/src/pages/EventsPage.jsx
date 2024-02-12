import React from "react";
import DashBoardHeader from "../components/DashBoard/DashBoardHeader";
import DashBoardSideBar from "../components/DashBoard/DashBoardSideBar";
import Events from "../components/Events/Events.jsx";
const EventsPage = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[90px] 800px:w-[330px]">
          <DashBoardSideBar active={5} />
        </div>
        <div className="flex justify-center w-full ">
          <Events />
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
