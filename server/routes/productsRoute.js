import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { handleCreateProduct } from "../controllers/productController.js";
const router = express.Router();
/**Post route */
router.route("/create-product").post(catchAsyncError(handleCreateProduct));
export default router;
