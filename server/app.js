import express from "express";
import "dotenv/config";
import cors from "cors";
import ErrorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import morgan from "morgan";
const app = express();
// App Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.disable("x-powered-by");
app.use(cookieParser());
app.use(morgan("tiny"));
app.use("/", express.static("uploads"));
/**Cors Setup */
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    httpOnly: true,
    credentials: true,
  })
);
app.use(ErrorHandler);
app.use((err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    console.error("Error:", err.message);
    err.handleError(res);
  } else {
    console.error("Unhandled Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
app.use("/api/v1/user", userRouter);

export default app;
