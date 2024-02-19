import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { handleCreateOrder } from "../controllers/orderController.js";
const router = express.Router();
router.route("/createOrder").post(catchAsyncError(handleCreateOrder));
export default router;
