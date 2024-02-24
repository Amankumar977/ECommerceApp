import express from "express";
import {
  handleRegisterShop,
  handleLoginShop,
  handleActivateShop,
  handleGetShop,
  handlePreviewShop,
  handleGetChatSeller,
} from "../controllers/shopController.js";
import upload from "../multer.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import isSellerAuthenticated from "../middleware/sellerAuth.js";
let router = express.Router();
/**POST Request */
router
  .route("/create-shop")
  .post(upload.single("avatar"), catchAsyncError(handleRegisterShop));
router.route("/activation").post(catchAsyncError(handleActivateShop));
router.route("/login-shop").post(catchAsyncError(handleLoginShop));
/**GET Request */
router
  .route("/getShop")
  .get(isSellerAuthenticated, catchAsyncError(handleGetShop));
router.route("/shopPreview/:id").get(catchAsyncError(handlePreviewShop));
router.route("/getChatSeller/:id").get(catchAsyncError(handleGetChatSeller));
export default router;
