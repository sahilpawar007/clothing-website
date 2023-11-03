import express from "express";
import { authorizeRole, isAuthenticatedUser } from "../middlewares/auth";
import {
  getSingleOrder,
  myOrders,
  newOrder,
  newOrderItems,
  newPaymentInfo,
  newShippingInfo,
} from "../controllers/OrderController";

const orderRoute = express.Router();

orderRoute.post("/shipping", isAuthenticatedUser, newShippingInfo);
orderRoute.post("/order/payment", isAuthenticatedUser, newPaymentInfo);
orderRoute.post("/order/new", isAuthenticatedUser, newOrder);
orderRoute.post("/orderItems/new", isAuthenticatedUser, newOrderItems);
orderRoute.get("/myorders", isAuthenticatedUser, myOrders);
orderRoute.get("/myorders/:id", isAuthenticatedUser, getSingleOrder);

export default orderRoute;
