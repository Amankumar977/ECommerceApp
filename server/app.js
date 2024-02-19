import express from "express";
import "dotenv/config";
import cors from "cors";
import ErrorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import shopRoute from "./routes/shopRoutes.js";
import morgan from "morgan";
import productRoute from "./routes/productsRoute.js";
import eventRoute from "./routes/eventRoute.js";
import couponRoute from "./routes/couponRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import orderRoute from "./routes/orderRoute.js";
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
/**routes */
app.use("/api/v1/user", userRouter);
app.use("/api/v1/shop", shopRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/events", eventRoute);
app.use("/api/v1/coupon", couponRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/orders", orderRoute);
export default app;
