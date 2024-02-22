import express from "express";
import {
  handleRegisterUser,
  handleLoginUser,
  handleActivateUser,
  handleGetuser,
  handleLogoutUser,
  handleGetAllProducts,
  handleUpdateUserDetails,
  handleAddAddress,
  handleDeleteAddress,
  handleChangePassword,
  handleGetChatUser,
} from "../controllers/userController.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import isAuthenticated from "../middleware/auth.js"; // Corrected the spelling
import upload from "../multer.js";

const router = express.Router();

// POST request
router
  .route("/create-user")
  .post(upload.single("avatar"), catchAsyncError(handleRegisterUser)); // Fixed the order of middlewares
router.route("/activation").post(catchAsyncError(handleActivateUser));
router.route("/login-user").post(catchAsyncError(handleLoginUser));
// GET request
router.route("/getAllProducts").get(catchAsyncError(handleGetAllProducts));
router.route("/getuser").get(isAuthenticated, catchAsyncError(handleGetuser));
router.route("/getChatUser/:id").get(catchAsyncError(handleGetChatUser));
router.route("/logout").get(isAuthenticated, catchAsyncError(handleLogoutUser));
// Patch request
router
  .route("/updateUserDeatils")
  .patch(
    upload.single("avatar"),
    isAuthenticated,
    catchAsyncError(handleUpdateUserDetails)
  );
router
  .route("/addAddress")
  .patch(isAuthenticated, catchAsyncError(handleAddAddress));
router
  .route("/changePassword")
  .patch(isAuthenticated, catchAsyncError(handleChangePassword));
/**Delete route */
router
  .route("/deleteAddress")
  .delete(isAuthenticated, catchAsyncError(handleDeleteAddress));
export default router;
