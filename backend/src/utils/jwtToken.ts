// Create Token and saving in cookie
import jwt from "jsonwebtoken";
import { Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE || "1d";
const COOKIE_EXPIRE =
  Number(process.env.COOKIE_EXPIRE || 1) * 24 * 60 * 60 * 1000;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined!");
}

const sendToken = async (userId: number, statusCode: number, res: Response) => {
  const tokenPayload = { id: userId };

  const token = jwt.sign(tokenPayload, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });

  // options for cookie
  const options = {
    expires: new Date(Date.now() + COOKIE_EXPIRE),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      user: { id: userId },
      token,
    });
};

export default sendToken;
