import express from "express";
import isAuthenticated from "../middleware/auth.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { handleGetAllAdminData } from "../controllers/adminController.js";
const router = express.Router();
/**GET Route */
router
  .route("/getAllAdminData/:id")
  .get(isAuthenticated, catchAsyncError(handleGetAllAdminData));
export default router;
