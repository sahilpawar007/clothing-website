import { Request, Response, NextFunction } from "express";
import { Orders } from "../Entity/Order";
import { OrderItems } from "../Entity/OrderItems";
import { PaymentInfo } from "../Entity/Payment";
import { ShippingInfo } from "../Entity/Shipping";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { myDataSource } from "../data-source";
import ErrorHandler from "../utils/errorHandler";
import { Product } from "../Entity/Product";
import { User } from "../Entity/User";

const userRepository = myDataSource.getRepository(User);
const productRepository = myDataSource.getRepository(Product);
const orderRepository = myDataSource.getRepository(Orders);
const shippingInfoRepository = myDataSource.getRepository(ShippingInfo);
const paymentInfoRepository = myDataSource.getRepository(PaymentInfo);
const orderItemRepository = myDataSource.getRepository(OrderItems);

// Shipping
export const newShippingInfo = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { address1, address2, city, state, country, pinCode, phoneNo } =
      req.body;

    const user = await userRepository.findOne({
      where: { id: Number(req.user?.id) },
    });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const shippingInfo = await shippingInfoRepository.create({
      address1,
      address2,
      city,
      state,
      country,
      pinCode,
      phoneNo,
      user: user,
    });

    await shippingInfoRepository.save(shippingInfo);

    res.status(201).json({
      success: true,
      shippingInfo,
    });
  }
);

// Payment
export const newPaymentInfo = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { paymentId, status, orderId } = req.body;

    const user = await userRepository.findOne({
      where: { id: Number(req.user?.id) },
    });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const order = await orderRepository.findOne({
      where: { id: orderId, user: { id: user.id } },
    });

    if (!order) {
      return next(new ErrorHandler("Order not found", 404));
    }

    const orderExist = await paymentInfoRepository.findOne({
      where: { order: { id: order.id }, user: { id: user.id } },
    });

    if (orderExist) {
      return next(new ErrorHandler("Order Id has been used", 404));
    }

    const paymentInfo = await paymentInfoRepository.create({
      paymentId,
      status,
      user: user,
      order: orderId,
    });

    if (paymentInfo.status === "succeeded") {
      await paymentInfoRepository.save(paymentInfo);
    } else {
      return next(new ErrorHandler("Payment unsuccessful", 404));
    }

    res.status(201).json({
      success: true,
      paymentInfo,
    });
  }
);

// New Order
export const newOrder = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { itemsPrice, taxPrice, shippingPrice, totalPrice, shippingInfo } =
      req.body;

    const user = await userRepository.findOne({
      where: { id: req.user?.id },
    });

    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }

    // Validate Shipping Info
    const validShippingInfo = await shippingInfoRepository.findOne({
      where: { id: shippingInfo, user: { id: user.id } },
    });

    if (!validShippingInfo) {
      return next(new ErrorHandler("Invalid Shipping Info", 400));
    }

    const order = await orderRepository.create({
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: user,
      shippingInfo: validShippingInfo,
    });

    await orderRepository.save(order);

    res.status(201).json({
      success: true,
      order,
    });
  }
);

// Order Items

export const newOrderItems = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { quantity, product, orders } = req.body;

    const user = await userRepository.findOne({
      where: { id: req.user?.id },
    });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const productId = await productRepository.findOne({
      where: { id: product },
    });

    if (!productId) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const orderId = await orderRepository.findOne({
      where: { id: orders, user: { id: user.id } },
    });

    if (!orderId) {
      return next(new ErrorHandler("Order not found", 404));
    }

    const orderItems = await orderItemRepository.create({
      name: productId?.name,
      price: productId.price,
      quantity,
      product,
      orders,
    });

    await orderItemRepository.save(orderItems);

    res.status(201).json({
      success: true,
      orderItems,
    });
  }
);

// Get All My Orders

export const myOrders = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userRepository.findOne({
      where: { id: req.user?.id },
    });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const orders = await orderRepository.find({
      where: { user: { id: user.id } },
    });

    if (!orders) {
      return next(new ErrorHandler("Orders not found", 404));
    }

    res.status(201).json({
      success: true,
      orders,
    });
  }
);

// Get All My Orders

export const getSingleOrder = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const orderId = Number(req.query.id);

    const user = await userRepository.findOne({
      where: { id: req.user?.id },
    });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const orders = await orderRepository.findOne({
      where: { id: orderId, user: { id: user.id } },
    });

    if (!orders) {
      return next(new ErrorHandler("Orders not found", 404));
    }

    res.status(201).json({
      success: true,
      orders,
    });
  }
);
