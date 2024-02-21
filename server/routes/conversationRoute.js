import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import {
  handleCreateConversation,
  handleGetAllSellerConversation,
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
export default router;
