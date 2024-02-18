import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { handleStripeCheckOut } from "../controllers/paymentController.js";
const router = express.Router();
/**Post Route */

router
  .route("/StripeCheckoutSession")
  .post(catchAsyncError(handleStripeCheckOut));
export default router;
