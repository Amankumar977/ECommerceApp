import express from "express";
import "dotenv/config";
import cors from "cors";
import ErrorHandler from "./utils/ErrorHandler.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import bodyParser from "body-parser";
const app = express();
// App Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.disable("x-powered-by");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(ErrorHandler);

/**Cors Setup */
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    httpOnly: true,
    credentials: true,
  })
);
app.use("/api/v1/user", userRouter);
export default app;
