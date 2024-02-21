import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Input, Label } from "../form";
import { AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";

const DashBoardMessages = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let getAllShopConversation = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER
          }/conversation/getAllSellerConversation/${seller.shop._id}`,
          { withCredentials: true }
        );
        response && setConversations(response.data.conversations);
      } catch (error) {
        console.log(error.response.message);
      }
    };
    getAllShopConversation();
  }, [seller]);

  return (
    <div className=" h-[86vh] bg-white my-5 mx-2  rounded">
      {/**All Messages list */}
      {!open && (
        <>
          <h1 className="text-center text-[35px]  my-2">All Messages</h1>
          {conversations &&
            conversations.map((conversation, index) => (
              <MessageList
                conversation={conversation}
                key={conversation.groupTitle}
                index={index}
                setOpen={setOpen}
              />
            ))}
        </>
      )}
      {open && <SellerInbox setOpen={setOpen} />}
    </div>
  );
};
const MessageList = ({ conversation, index, open, setOpen }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const handleGoToConversation = (id) => {
    setActive(index);
    navigate(`?${id}`);
    setOpen(true);
  };
  return (
    <div
      className={`w-full flex my-3 px-4 py-2 ${
        active === index ? "bg-[#d2cccc77]" : "bg-transparent"
      } cursor-pointer`}
      onClick={() => handleGoToConversation(conversation._id)}>
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
const SellerInbox = ({ setOpen }) => {
  let handleGoBacktoMessage = () => {
    setOpen(false);
  };
  return (
    <div className="w-full min-h-full flex flex-col justify-between ">
      {/**Message header */}
      <div className="w-full flex p-3  bg-slate-300 text-white justify-between font-mono">
        <div className="flex ">
          <img
            src="https://images.unsplash.com/photo-1526509569184-2fe126e71cd3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGVzYmlhbnxlbnwwfHwwfHx8MA%3D%3Dhttps://images.unsplash.com/photo-1526509569184-2fe126e71cd3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGVzYmlhbnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Profile image"
            className="w-[64px] h-[64px] rounded-full"
          />
          <div className="pl-5 ">
            <h1 className="text-[18px] font-[600]">Aman Kumar</h1>
            <p className="text-green-400">Active now</p>
          </div>
        </div>
        <div
          className="bg-gray-500 px-4 py-3 mt-3 cursor-pointer text-white  rounded-md  text-center"
          onClick={() => handleGoBacktoMessage()}>
          <div>
            <FaArrowLeft size={30} />
          </div>
        </div>
      </div>
      {/** Messages*/}
      <div className="px-3 h-[65vh] py-2 overflow-y-scroll">
        <div className="w-full flex my-2">
          <img
            src="https://images.unsplash.com/photo-1526509569184-2fe126e71cd3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGVzYmlhbnxlbnwwfHwwfHx8MA%3D%3Dhttps://images.unsplash.com/photo-1526509569184-2fe126e71cd3?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bGVzYmlhbnxlbnwwfHwwfHx8MA%3D%3D"
            alt="Profile image"
            className="w-[50px] h-[50px] rounded-full mr-3"
          />
          <div className="w-max p-2 rounded-[4px] bg-[#38c776] text-white h-min">
            <p>Hello There</p>
          </div>
        </div>
        <div className="w-full flex my-2 justify-end">
          <div className="w-max p-2 rounded-[4px] bg-[#38c776] text-white h-min">
            <p>Hi! </p>
          </div>
        </div>
      </div>
      {/**send message input */}
      <form aria-required={true} className="p-3 relative w-full">
        <Input
          placeholder={"Enter your message...."}
          className={"font-mono px-9 "}
        />
        <Label
          htmlFor={"sendMessage"}
          label={<AiOutlineSend />}
          className={"absolute  top-6 right-6 z-50 cursor-pointer"}
        />
        <Input
          type={"submit"}
          value={"sendMessage"}
          className={"hidden"}
          id={"sendMessage"}
        />
        <Label
          htmlFor={"sendImage"}
          label={<TfiGallery />}
          className={"absolute  top-6 left-5 z-50 cursor-pointer"}
        />
        <Input type={"file"} className={"hidden"} id={"sendImage"} />
      </form>
    </div>
  );
};
export default DashBoardMessages;
