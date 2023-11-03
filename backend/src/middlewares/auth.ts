import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "./catchAsyncErrors";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User, UserType } from "../Entity/User";
import { myDataSource } from "../data-source";
import * as dotenv from "dotenv";
import { ProductType } from "../Entity/Product";
import { ReviewsType } from "../Entity/Reviews";
import { ShippingInfoType } from "../Entity/Shipping";
import { PaymentInfoType } from "../Entity/Payment";
import { OrderType } from "../Entity/Order";

dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    user: UserType | null;
    product: ProductType | null;
    reviews: ReviewsType | null;
    order: OrderType | null;
    shippingInfo: ShippingInfoType | null;
    paymentInfo: PaymentInfoType | null;
  }
}

interface MyJwtPayload extends JwtPayload {
  id: number;
}

export const isAuthenticatedUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    // JWT Secret Key
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!token) {
      return next(new ErrorHandler("Please login to access this route", 401));
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET must be defined!");
    }

    const userRepository = myDataSource.getRepository(User);

    const decodedData = jwt.verify(token, JWT_SECRET) as MyJwtPayload;

    req.user = await userRepository.findOne({ where: { id: decodedData.id } });

    next();
  }
);

export const authorizeRole = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ErrorHandler("User data not available", 403));
    }
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
