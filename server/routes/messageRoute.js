import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { handleCreateNewMessage } from "../controllers/messageController.js";
import upload from "../multer.js";
const router = express.Router();
router
  .route("/create-new-message")
  .post(upload.array("images"), catchAsyncError(handleCreateNewMessage));
export default router;
