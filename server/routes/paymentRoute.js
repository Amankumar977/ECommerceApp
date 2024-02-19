import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import {
  handleStripeCheckOut,
  handleRazorpayPayment,
  handleRazorpayPaymentVerification,
} from "../controllers/paymentController.js";
const router = express.Router();
/**Post Route */
router
  .route("/StripeCheckoutSession")
  .post(catchAsyncError(handleStripeCheckOut));
router.route("/razorpayPayment").post(catchAsyncError(handleRazorpayPayment));
router
  .route("/razorpayPaymentVerification")
  .post(catchAsyncError(handleRazorpayPaymentVerification));
export default router;
