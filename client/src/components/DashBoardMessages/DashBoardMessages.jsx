import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Input, Label } from "../form";
import { AiOutlineSend } from "react-icons/ai";
import { TfiGallery } from "react-icons/tfi";
import SocketIO from "socket.io-client";
import { format } from "timeago.js";
const socketId = SocketIO("https://peopelysocket-production.up.railway.app/", {
  transports: ["websocket"],
});
const DashBoardMessages = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [online, setOnline] = useState(false);
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
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
  }, [seller, messages]);
  useEffect(() => {
    if (seller) {
      const sellerId = seller.shop._id;
      socketId.emit("addUser", sellerId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);
  let onlineCheck = (chat) => {
    const chatMembers = chat.members.find(
      (member) => member !== seller.shop._id
    );
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    // setOnline(online ? true : false);
    return online ? true : false;
  };
  //Get Messages
  useEffect(() => {
    let getAllMessages = async () => {
      await axios
        .get(
          `${import.meta.env.VITE_SERVER}/messages/getAllMessages/${
            currentChat?._id
          }`
        )
        .then((res) => {
          setMessages(res.data.allMessages);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getAllMessages();
  }, [currentChat]);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const message = {
      sender: seller.shop._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find(
      (member) => member !== seller.shop._id
    );
    socketId.emit("sendMessage", {
      senderId: seller.shop._id,
      receiverId,
      text: newMessage,
    });
    try {
      if (newMessage !== "") {
        await axios
          .post(
            `${import.meta.env.VITE_SERVER}/messages/create-new-message`,
            message
          )
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  let updateLastMessage = async () => {
    let lastMessageObject = {
      lastMessage: newMessage,
      lastMessageId: seller.shop._id,
    };
    socketId.emit("updateLastMessage", lastMessageObject);
    await axios
      .patch(
        `${import.meta.env.VITE_SERVER}/conversation/updateLastMessage/${
          currentChat._id
        }`,
        lastMessageObject
      )
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => console.log(error.message));
  };

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
                setCurrentChat={setCurrentChat}
                seller={seller.shop._id}
                user={user}
                setUser={setUser}
                online={onlineCheck(conversation)}
                setOnline={setOnline}
              />
            ))}
        </>
      )}
      {open && (
        <SellerInbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          user={user}
          online={online}
        />
      )}
    </div>
  );
};
const MessageList = ({
  conversation,
  index,
  setOpen,
  setCurrentChat,
  seller,
  setUser,
  user,
  online,
  setOnline,
}) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    const userId = conversation.members.find((id) => id !== seller);
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER}/user/getChatUser/${userId}`
        );
        setUserInfo(response.data.user);
        setUser(response.data.user);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    getUser();
  }, [conversation, seller]);

  const handleGoToConversation = (id) => {
    setActive(index);
    navigate(`?${id}`);
    setOpen(true);
    setCurrentChat(conversation);
    setOnline(online);
  };
  return (
    userInfo && (
      <div
        className={`w-full flex my-3 px-4 py-2 ${
          active === index ? "bg-[#d2cccc77]" : "bg-transparent"
        } cursor-pointer`}
        onClick={() => handleGoToConversation(conversation._id)}>
        <div className="relative">
          <img
            src={userInfo.avatar}
            alt={userInfo.name}
            className="w-14 h-14 rounded-full"
          />
          {online ? (
            <div className="w-[15px] h-[15px] bg-green-500 rounded-full top-1 left-[40px] absolute"></div>
          ) : (
            <div className="w-[15px] h-[15px] bg-[#b5a9a9eb] rounded-full top-1 left-[40px] absolute"></div>
          )}
        </div>
        <div className="pl-5 space-y-1">
          <h1 className=" text-[18px]">{userInfo.name}</h1>
          <p className="text-[16px] text-[#000c]">
            {conversation.lastMessageId === seller
              ? "You"
              : userInfo?.name?.split(" ")[0] + ": "}
            : {conversation.lastMessage}
          </p>
        </div>
      </div>
    )
  );
};
const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  user,
  online,
}) => {
  const { seller } = useSelector((state) => state.seller);
  let handleGoBacktoMessage = () => {
    setOpen(false);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between ">
      {/**Message header */}
      <div className="w-full flex p-3  bg-slate-300 text-white justify-between ">
        <div className="flex ">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-[64px] h-[64px] rounded-full"
          />
          <div className="pl-5 ">
            <h1
              className={`${
                online
                  ? "text-[18px] font-[600]"
                  : "text-[18px] font-[600] pt-4"
              }`}>
              {user.name}
            </h1>
            <p className="text-green-400">{online ? "Active Now" : null}</p>
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
      <div className="w-full px-3 h-[65vh] py-2 overflow-y-scroll ">
        {messages &&
          messages.map((message, index) =>
            message.sender === seller.shop._id ? (
              <div
                className={`w-full flex my-2 ${"justify-end"}`}
                key={message._id}>
                <div>
                  {message.text !== "" && (
                    <div>
                      <div className={`flex justify-end w-96 `}>
                        <div
                          className={`flex justify-end items-center p-2 rounded-[4px] bg-[#181717f1] text-white h-min `}>
                          <p>{message.text}</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <p className="mt-[4px] text-[12px] text-[#272727d2]">
                          {format(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                className={`w-full flex my-2 ${"justify-start"}`}
                key={message._id}>
                <div className="flex">
                  <img
                    src={user.avatar}
                    alt="Profile image"
                    className="w-[50px] h-[50px] rounded-full mr-3"
                  />
                  {message.text !== "" && (
                    <div>
                      <div className={`flex justify-start ml-4 w-96 `}>
                        <div
                          className={`flex justify-end items-center p-2 rounded-[4px] bg-[#38c776] text-white h-min `}>
                          <p>{message.text}</p>
                        </div>
                      </div>
                      <div className="flex justify-start ml-4 mt-2 ">
                        <p className="mt-[4px] text-[12px] text-[#272727d2]">
                          {format(message.createdAt)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          )}
      </div>
      {/**send message input */}
      <form
        aria-required={true}
        className="p-3 relative w-full"
        onSubmit={sendMessageHandler}>
        <Input
          placeholder={"Enter your message...."}
          className={"font-mono px-9 "}
          value={newMessage}
          handleChange={(newValue) => setNewMessage(newValue)}
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
