import express, { urlencoded } from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";
import "dotenv/config";
import morgan from "morgan";
// server creation
const app = express();
const server = createServer(app);
const io = new Server(server);
//Cors setup
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    httpOnly: true,
    credentials: true,
  })
);
// app middleware
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("tiny"));
app.disable("x-powered-by");
app.get("/", (req, res) => {
  res.send("<h1>Hello From Socket IO</h1>");
});
// creating the users
let users = [];
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (receiverId) => {
  return users.find((user) => user.userId === receiverId);
};
// Define a seen proprty with message
const createMessage = ({ senderId, receiverId, text, images }) => ({
  senderId,
  receiverId,
  text,
  images,
  seen: false,
});

io.on("connection", (socket) => {
  console.log(`a user is connected`);
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUser", users);
  });
  // send and get message
  const messages = {};
  socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
    const message = createMessage({ senderId, receiverId, text, images });
    const user = getUser(receiverId);
    if (!messages[receiverId]) {
      messages[receiverId] = [message];
    } else {
      messages[receiverId].push(message);
    }
    io.to(user?.socketId).emit("getMessage", message);
  });
  socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
    const user = getUser(senderId);
    if (messages[senderId]) {
      const message = messages[senderId].find(
        (message) =>
          message.receiverId === receiverId && message.id === messageId
      );
      if (message) {
        message.seen = true;
        // send a message seen event to the user
        io.to(user?.socketId).emit("messageSeen", {
          senderId,
          receiverId,
          messageId,
        });
      }
    }
  });
  // update and get the last message
  socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
    io.emit("getlastMessage", {
      lastMessage,
      lastMessageId,
    });
  });
  // when the user will disconnect
  socket.on("disconnect", () => {
    console.log("A user is discnnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// Starting the server
server.listen(process.env.PORT, () => {
  console.log(`The sever is started at ${process.env.PORT}`);
});
