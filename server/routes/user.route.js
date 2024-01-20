import express from "express";
import {
  handleRegisterUser,
  handleLoginUser,
} from "../controllers/userController.js";
const router = express.Router();
/** POST request */
router.post("/register", handleRegisterUser);
router.post("/login", handleLoginUser);
/** GET request */
export default router;
