import React from "react";

const DashBoardMessages = () => {
  return (
    <div className="w-[90%] h-[86vh] bg-white m-5  overflow-y-scroll rounded">
      <h1 className="text-center text-[35px]  my-2">All Messages</h1>
      {/**All Messages list */}
      <MessageList />
      <MessageList />
      <MessageList />
      <MessageList />
      <MessageList />
      <MessageList />
      <MessageList />
      <MessageList />
      <MessageList />
    </div>
  );
};
const MessageList = () => {
  return (
    <div className="w-full flex my-3 px-4 py-2 bg-[#d2cccc77] cursor-pointer">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1526509569184-2fe126e71cd3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGVzYmlhbnxlbnwwfHwwfHx8MA%3D%3Dhttps://images.unsplash.com/photo-1526509569184-2fe126e71cd3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGVzYmlhbnxlbnwwfHwwfHx8MA%3D%3D"
          alt="Profile image"
          className="w-14 h-14 rounded-full"
        />
        <div className="w-[15px] h-[15px] bg-green-500 rounded-full top-1 left-[40px] absolute"></div>
      </div>
      <div className="pl-5 space-y-1">
        <h1 className=" text-[18px]">Sarah Ali Khan</h1>
        <p className="text-[16px] text-[#000c]">You : Yeah, I'm good!</p>
      </div>
    </div>
  );
};
export default DashBoardMessages;
