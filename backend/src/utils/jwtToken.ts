// Create Token and saving in cookie
import { Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const COOKIE_EXPIRE = Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000;

const sendToken = async (user: any, statusCode: number, res: Response) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(Date.now() + COOKIE_EXPIRE),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user: user,
    token,
  });
};

export default sendToken;
