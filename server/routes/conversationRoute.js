import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import {
  handleCreateConversation,
  handleGetAllSellerConversation,
  handleUpdateLastMessage,
} from "../controllers/conversationController.js";
import isSeller from "../middleware/sellerAuth.js";
const router = express.Router();
/**POST ROUTE */
router
  .route("/createNewConversation")
  .post(catchAsyncError(handleCreateConversation));
/**GET Route */
router
  .route("/getAllSellerConversation/:id")
  .get(isSeller, catchAsyncError(handleGetAllSellerConversation));
/**Patch Request */
router
  .route("/updateLastMessage/:id")
  .patch(catchAsyncError(handleUpdateLastMessage));
export default router;
