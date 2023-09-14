import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/errorHandler";
import { catchAsyncErrors } from "./catchAsyncErrors";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User, UserType } from "../Entity/User";
import { myDataSource } from "../data-source";
import * as dotenv from "dotenv";

dotenv.config();

declare module "express-serve-static-core" {
  interface Request {
    user: UserType | null; // You can be more specific with the type if you wish.
  }
}

interface MyJwtPayload extends JwtPayload {
  id: number;
}

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;

export const isAuthenticatedUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      return next(new ErrorHandler("Please login to access this route", 401));
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET must be defined!");
    }

    const decodedData = jwt.verify(token, JWT_SECRET) as MyJwtPayload;

    const userRepository = myDataSource.getRepository(User);

    req.user = await userRepository.findOne({ where: { id: decodedData.id } });

    next();
  }
);
