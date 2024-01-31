import catchAsyncError from "./catchAsyncError";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel";
export default isAunthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please Login to continue",
    });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await userModel.findById(decoded._id);
  next();
});
