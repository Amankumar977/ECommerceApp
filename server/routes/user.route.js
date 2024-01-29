import express from "express";
import {
  handleRegisterUser,
  handleLoginUser,
} from "../controllers/userController.js";
const router = express.Router();
/** POST request */
router.route("/create-user").post(handleRegisterUser);
router.route("/login-user").post(handleLoginUser);
/** GET request */
export default router;
