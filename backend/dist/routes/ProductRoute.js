"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const ProductController_1 = require("../controllers/ProductController");
const productRouter = express_1.default.Router();
productRouter.post("/admin/createProduct", auth_1.isAuthenticatedUser, (0, auth_1.authorizeRole)("admin"), ProductController_1.createProduct);
productRouter.get("/products", ProductController_1.getAllProduct);
productRouter.get("/product/:id", ProductController_1.getProductDetails);
productRouter.put("/review", auth_1.isAuthenticatedUser, ProductController_1.createReview);
productRouter.get("/reviews", ProductController_1.getAllReviews);
productRouter.delete("/reviews", auth_1.isAuthenticatedUser, ProductController_1.deleteReview);
exports.default = productRouter;
//# sourceMappingURL=ProductRoute.js.map