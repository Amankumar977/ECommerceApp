import express from "express";
import "dotenv/config";
import connectToDb from "./database/config.js";
import cors from "cors";
import userRouter from "./routes/user.route.js";
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.get("/ping", (req, res) => {
  return res.status(201).json({
    success: true,
    msg: "Pong",
  });
});
app.get("/check", (req, res) => {
  return res.status(201).json({
    msg: "Hello",
  });
});
app.use("/api/v1/user", userRouter);
connectToDb();
app.listen(PORT, () => {
  console.log("The server has started at", PORT);
});
