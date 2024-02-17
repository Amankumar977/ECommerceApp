import express from "express";
import isSellerAuth from "../middleware/sellerAuth.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import {
  handleCreateCoupon,
  handlegetShopCoupon,
  handleDeleteCoupon,
  handleGetCoupon,
} from "../controllers/couponController.js";
import isAuthenticated from "../middleware/auth.js";
let router = express.Router();
/**Post route */
router
  .route("/create-coupon")
  .post(isSellerAuth, catchAsyncError(handleCreateCoupon));
/**Get Route */
router
  .route("/getShopCoupon/:id")
  .get(isSellerAuth, catchAsyncError(handlegetShopCoupon));
router
  .route("/getCoupon/:couponCode")
  .get(isAuthenticated, catchAsyncError(handleGetCoupon));
/**Delete Route */
router
  .route("/deleteCoupon/:id")
  .delete(isSellerAuth, catchAsyncError(handleDeleteCoupon));
export default router;
