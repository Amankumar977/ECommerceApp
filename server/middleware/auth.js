import catchAsyncError from "../middleware/catchAsyncError.js";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please Login to continue",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = await userModel.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
});

export default isAuthenticated;
