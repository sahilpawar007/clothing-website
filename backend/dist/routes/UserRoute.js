"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/register", UserController_1.userRegister);
router.post("/login", UserController_1.userLogin);
router.get("/logout", UserController_1.userLogout);
router.get("/profile", auth_1.isAuthenticatedUser, UserController_1.getUserDetails);
router.put("/password/update", auth_1.isAuthenticatedUser, UserController_1.updatePassword);
router.put("/profile/update", auth_1.isAuthenticatedUser, UserController_1.updateProfile);
exports.default = router;
//# sourceMappingURL=UserRoute.js.map