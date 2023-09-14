import express, { Router } from "express";
import {
  getUserDetails,
  updatePassword,
  updateProfile,
  // forgotPassword,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/UserController";
import { isAuthenticatedUser } from "../middlewares/auth";
const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.get("/profile", isAuthenticatedUser, getUserDetails);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.put("/profile/update", isAuthenticatedUser, updateProfile);

export default router;
