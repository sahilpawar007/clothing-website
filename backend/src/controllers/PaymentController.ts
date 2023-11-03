// import { NextFunction } from "express";
// import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
// import * as dotenv from "dotenv";
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// dotenv.config();

// stripe.setApiKey(process.env.STRIPE_API_KEY, process.env.STRIPE_SECRET_KEY);

// const processPaymant = catchAsyncErrors(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const myPayment = await stripe.paymentIntents.create({
//     amount: req.body?.amount,
//     currency: "inr",
//     metadata: {
//       company: "Cloting Website",
//     },
//   })
//   res.status(209).json({
//     success: true,
//     orders,
//   });
//   }
// );
