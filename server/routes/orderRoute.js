import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import {
  handleCreateOrder,
  handleGetUserOrder,
  handleGetShopOrder,
  handlegetOrderDetails,
  handleSubmitReview,
  handleUpdateOrderStatus,
} from "../controllers/orderController.js";
import isAuthenticated from "../middleware/auth.js";
import issellerAuth from "../middleware/sellerAuth.js";
const router = express.Router();
/**POST Route */
router.route("/createOrder").post(catchAsyncError(handleCreateOrder));

router
  .route("/submitReview")
  .post(isAuthenticated, catchAsyncError(handleSubmitReview));
/**GET Route */
router
  .route("/getUserOrder/:id")
  .get(isAuthenticated, catchAsyncError(handleGetUserOrder));
router
  .route("/getShopOrders/:id")
  .get(issellerAuth, catchAsyncError(handleGetShopOrder));

router
  .route("/getOrderDetails/:id")
  .get(catchAsyncError(handlegetOrderDetails));
/**PATCH REQUEST */
router
  .route("/updatedOrderStatus")
  .patch(issellerAuth, catchAsyncError(handleUpdateOrderStatus));

export default router;
