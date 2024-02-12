import React from "react";
import DashBoardHeader from "../components/DashBoard/DashBoardHeader";
import DashBoardSideBar from "../components/DashBoard/DashBoardSideBar";
import CreateEvent from "../components/CreateEvent/CreateEvent";
const CreateEventPage = () => {
  return (
    <div>
      <DashBoardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[90px] 800px:w-[330px]">
          <DashBoardSideBar active={6} />
        </div>
        <div className="w-full justify-center flex">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
