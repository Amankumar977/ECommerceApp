import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import {
  handleCreateNewMessage,
  handleGetAllMessages,
} from "../controllers/messageController.js";
import upload from "../multer.js";
const router = express.Router();
/**POST MESSAGES */
router
  .route("/create-new-message")
  .post(upload.array("images"), catchAsyncError(handleCreateNewMessage));
/**GET MESSAGES */
router.route("/getAllMessages/:id").get(catchAsyncError(handleGetAllMessages));
export default router;
