"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const OrderController_1 = require("../controllers/OrderController");
const orderRoute = express_1.default.Router();
orderRoute.post("/shipping", auth_1.isAuthenticatedUser, OrderController_1.newShippingInfo);
orderRoute.post("/order/payment", auth_1.isAuthenticatedUser, OrderController_1.newPaymentInfo);
orderRoute.post("/order/new", auth_1.isAuthenticatedUser, OrderController_1.newOrder);
orderRoute.post("/orderItems/new", auth_1.isAuthenticatedUser, OrderController_1.newOrderItems);
orderRoute.get("/myorders", auth_1.isAuthenticatedUser, OrderController_1.myOrders);
orderRoute.get("/myorders/:id", auth_1.isAuthenticatedUser, OrderController_1.getSingleOrder);
exports.default = orderRoute;
//# sourceMappingURL=OrderRoute.js.map