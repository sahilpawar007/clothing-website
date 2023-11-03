"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleOrder = exports.myOrders = exports.newOrderItems = exports.newOrder = exports.newPaymentInfo = exports.newShippingInfo = void 0;
const Order_1 = require("../Entity/Order");
const OrderItems_1 = require("../Entity/OrderItems");
const Payment_1 = require("../Entity/Payment");
const Shipping_1 = require("../Entity/Shipping");
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const data_source_1 = require("../data-source");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const Product_1 = require("../Entity/Product");
const User_1 = require("../Entity/User");
const userRepository = data_source_1.myDataSource.getRepository(User_1.User);
const productRepository = data_source_1.myDataSource.getRepository(Product_1.Product);
const orderRepository = data_source_1.myDataSource.getRepository(Order_1.Orders);
const shippingInfoRepository = data_source_1.myDataSource.getRepository(Shipping_1.ShippingInfo);
const paymentInfoRepository = data_source_1.myDataSource.getRepository(Payment_1.PaymentInfo);
const orderItemRepository = data_source_1.myDataSource.getRepository(OrderItems_1.OrderItems);
// Shipping
exports.newShippingInfo = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { address1, address2, city, state, country, pinCode, phoneNo } = req.body;
    const user = yield userRepository.findOne({
        where: { id: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) },
    });
    if (!user) {
        return next(new errorHandler_1.default("User not found", 404));
    }
    const shippingInfo = yield shippingInfoRepository.create({
        address1,
        address2,
        city,
        state,
        country,
        pinCode,
        phoneNo,
        user: user,
    });
    yield shippingInfoRepository.save(shippingInfo);
    res.status(201).json({
        success: true,
        shippingInfo,
    });
}));
// Payment
exports.newPaymentInfo = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { paymentId, status, orderId } = req.body;
    const user = yield userRepository.findOne({
        where: { id: Number((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) },
    });
    if (!user) {
        return next(new errorHandler_1.default("User not found", 404));
    }
    const order = yield orderRepository.findOne({
        where: { id: orderId, user: { id: user.id } },
    });
    if (!order) {
        return next(new errorHandler_1.default("Order not found", 404));
    }
    const orderExist = yield paymentInfoRepository.findOne({
        where: { order: { id: order.id }, user: { id: user.id } },
    });
    if (orderExist) {
        return next(new errorHandler_1.default("Order Id has been used", 404));
    }
    const paymentInfo = yield paymentInfoRepository.create({
        paymentId,
        status,
        user: user,
        order: orderId,
    });
    if (paymentInfo.status === "succeeded") {
        yield paymentInfoRepository.save(paymentInfo);
    }
    else {
        return next(new errorHandler_1.default("Payment unsuccessful", 404));
    }
    res.status(201).json({
        success: true,
        paymentInfo,
    });
}));
// New Order
exports.newOrder = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { itemsPrice, taxPrice, shippingPrice, totalPrice, shippingInfo } = req.body;
    const user = yield userRepository.findOne({
        where: { id: (_c = req.user) === null || _c === void 0 ? void 0 : _c.id },
    });
    if (!user) {
        return next(new errorHandler_1.default("user not found", 404));
    }
    // Validate Shipping Info
    const validShippingInfo = yield shippingInfoRepository.findOne({
        where: { id: shippingInfo, user: { id: user.id } },
    });
    if (!validShippingInfo) {
        return next(new errorHandler_1.default("Invalid Shipping Info", 400));
    }
    const order = yield orderRepository.create({
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user: user,
        shippingInfo: validShippingInfo,
    });
    yield orderRepository.save(order);
    res.status(201).json({
        success: true,
        order,
    });
}));
// Order Items
exports.newOrderItems = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { quantity, product, orders } = req.body;
    const user = yield userRepository.findOne({
        where: { id: (_d = req.user) === null || _d === void 0 ? void 0 : _d.id },
    });
    if (!user) {
        return next(new errorHandler_1.default("User not found", 404));
    }
    const productId = yield productRepository.findOne({
        where: { id: product },
    });
    if (!productId) {
        return next(new errorHandler_1.default("Product not found", 404));
    }
    const orderId = yield orderRepository.findOne({
        where: { id: orders, user: { id: user.id } },
    });
    if (!orderId) {
        return next(new errorHandler_1.default("Order not found", 404));
    }
    const orderItems = yield orderItemRepository.create({
        name: productId === null || productId === void 0 ? void 0 : productId.name,
        price: productId.price,
        quantity,
        product,
        orders,
    });
    yield orderItemRepository.save(orderItems);
    res.status(201).json({
        success: true,
        orderItems,
    });
}));
// Get All My Orders
exports.myOrders = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const user = yield userRepository.findOne({
        where: { id: (_e = req.user) === null || _e === void 0 ? void 0 : _e.id },
    });
    if (!user) {
        return next(new errorHandler_1.default("User not found", 404));
    }
    const orders = yield orderRepository.find({
        where: { user: { id: user.id } },
    });
    if (!orders) {
        return next(new errorHandler_1.default("Orders not found", 404));
    }
    res.status(201).json({
        success: true,
        orders,
    });
}));
// Get All My Orders
exports.getSingleOrder = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const orderId = Number(req.query.id);
    const user = yield userRepository.findOne({
        where: { id: (_f = req.user) === null || _f === void 0 ? void 0 : _f.id },
    });
    if (!user) {
        return next(new errorHandler_1.default("User not found", 404));
    }
    const orders = yield orderRepository.findOne({
        where: { id: orderId, user: { id: user.id } },
    });
    if (!orders) {
        return next(new errorHandler_1.default("Orders not found", 404));
    }
    res.status(201).json({
        success: true,
        orders,
    });
}));
//# sourceMappingURL=OrderController.js.map