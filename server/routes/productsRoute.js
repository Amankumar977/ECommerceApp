import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import {
  handleCreateProduct,
  handleAllProducts,
  handleDeleteProducts,
} from "../controllers/productController.js";
import upload from "../multer.js";
import isSeller from "../middleware/sellerAuth.js";
const router = express.Router();
/**Post route */
router
  .route("/create-product")
  .post(upload.array("images", 5), catchAsyncError(handleCreateProduct));
export default router;
/**Get route */
router.route("/getAllShopProducts/:id").get(catchAsyncError(handleAllProducts));
/**Delete routes */
router
  .route("/deleteProduct/:id")
  .delete(catchAsyncError(handleDeleteProducts));
