import express from "express";
import {
  forgotPassword,
  getUserDetails,
  resetPassword,
  updatePassword,
  updateProfile,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/UserController";
import { isAuthenticatedUser } from "../middlewares/auth";
const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/logout", userLogout);
userRouter.get("/profile", isAuthenticatedUser, getUserDetails);
userRouter.put("/password/update", isAuthenticatedUser, updatePassword);
userRouter.put("/profile/update", isAuthenticatedUser, updateProfile);
userRouter.post("/password/forgot", forgotPassword);
userRouter.put("/password/reset/:token", resetPassword);

export default userRouter;
