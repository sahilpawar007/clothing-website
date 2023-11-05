import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routes/UserRoute";
import productRouter from "./routes/ProductRoute";
import orderRoute from "./routes/OrderRoute";
// import cors from "cors";
const app = express();

const errorMiddleware = require("./middlewares/error");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: "http://localhost:5173", // your frontend app's address
//   credentials: true,
// };
// app.use(cors(corsOptions));

app.use("/api/v1", userRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", orderRoute);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message,
  });
});

app.use(errorMiddleware);

export default app;
