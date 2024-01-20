import express from "express";
import "dotenv/config";
import connectToDb from "./database/config.js";
const app = express();
const PORT = process.env.PORT;
app.get("/ping", (req, res) => {
  return res.status(201).json({
    success: true,
    msg: "Pong",
  });
});
connectToDb();
app.listen(PORT, () => {
  console.log("The server has started at", PORT);
});
