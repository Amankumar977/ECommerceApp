import express from "express";
import {
  handleRegisterUser,
  handleLoginUser,
  handleActivateUser,
  handleGetuser,
} from "../controllers/userController.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import isAunthenticated from "../middleware/catchAsyncError.js";
import upload from "../multer.js";
const router = express.Router();
/** POST request */
router.route("/create-user").post(upload.single("file"), handleRegisterUser);
router.route("/activation").post(catchAsyncError(handleActivateUser));
router.route("/login-user").post(catchAsyncError(handleLoginUser));
/** GET request */
router.route("/getuser").get(isAunthenticated, catchAsyncError(handleGetuser));
export default router;
