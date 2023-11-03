"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const auth_1 = require("../middlewares/auth");
const userRouter = express_1.default.Router();
userRouter.post("/register", UserController_1.userRegister);
userRouter.post("/login", UserController_1.userLogin);
userRouter.get("/logout", UserController_1.userLogout);
userRouter.get("/profile", auth_1.isAuthenticatedUser, UserController_1.getUserDetails);
userRouter.put("/password/update", auth_1.isAuthenticatedUser, UserController_1.updatePassword);
userRouter.put("/profile/update", auth_1.isAuthenticatedUser, UserController_1.updateProfile);
userRouter.post("/password/forgot", UserController_1.forgotPassword);
userRouter.put("/password/reset/:token", UserController_1.resetPassword);
exports.default = userRouter;
//# sourceMappingURL=UserRoute.js.map