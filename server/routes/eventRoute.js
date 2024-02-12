import express from "express";
import catchAsyncError from "../middleware/catchAsyncError.js";
import {
  handleCreateEvent,
  handleGetShopEvents,
  handleDeleteEvent,
} from "../controllers/eventController.js";
import upload from "../multer.js";
import isSellerAuth from "../middleware/sellerAuth.js";
const router = express.Router();
/**Post Requests */
router
  .route("/create-event")
  .post(
    upload.array("images", 5),
    isSellerAuth,
    catchAsyncError(handleCreateEvent)
  );
/**Get request */
router
  .route("/getShopEvents/:id")
  .get(isSellerAuth, catchAsyncError(handleGetShopEvents));
/**Delete rote */
router.route("/delete-event/:id").delete(catchAsyncError(handleDeleteEvent));
export default router;
