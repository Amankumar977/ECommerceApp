import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import {
  handleCreateOrder,
  handleGetUserOrder,
  handleGetShopOrder,
} from "../controllers/orderController.js";
import isAuthenticated from "../middleware/auth.js";
import issellerAuth from "../middleware/sellerAuth.js";
const router = express.Router();
/**POST Route */
router.route("/createOrder").post(catchAsyncError(handleCreateOrder));
/**GET Route */
router
  .route("/getUserOrder/:id")
  .get(isAuthenticated, catchAsyncError(handleGetUserOrder));
router
  .route("/getShopOrders/:id")
  .get(issellerAuth, catchAsyncError(handleGetShopOrder));
export default router;
