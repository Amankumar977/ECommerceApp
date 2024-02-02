import express from "express";
import {
  handleRegisterUser,
  handleLoginUser,
  handleActivateUser,
  handleGetuser,
} from "../controllers/userController.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import isAuthenticated from "../middleware/auth.js"; // Corrected the spelling
import upload from "../multer.js";

const router = express.Router();

// POST request
router
  .route("/create-user")
  .post(upload.single("file"), catchAsyncError(handleRegisterUser)); // Fixed the order of middlewares
router.route("/activation").post(catchAsyncError(handleActivateUser));
router.route("/login-user").post(catchAsyncError(handleLoginUser));

// GET request
router.route("/getuser").get(isAuthenticated, catchAsyncError(handleGetuser)); // Fixed the middleware name

export default router;
