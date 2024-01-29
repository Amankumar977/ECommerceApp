import app from "./app.js";
import connectToDb from "./database/config.js";
const PORT = process.env.PORT;
// Handling Uncaught exception
process.on("uncaughtException", (err) => {
  console.log("Error", err.message);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

// Server healthCheckUp Route
app.get("/ping", (req, res) => {
  return res.status(201).json({
    success: true,
    msg: "Pong",
  });
});
// Connecting to MongoDB
connectToDb();
const server = app.listen(PORT, () => {
  console.log("The server has started at", PORT);
});
// Handling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log("Error", err.message);
  console.log("Shutting down the server due to unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
