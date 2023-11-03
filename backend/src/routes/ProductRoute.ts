import express from "express";
import { authorizeRole, isAuthenticatedUser } from "../middlewares/auth";
import {
  createProduct,
  createReview,
  deleteReview,
  getAllProduct,
  getAllReviews,
  getProductDetails,
} from "../controllers/ProductController";

const productRouter = express.Router();

productRouter.post(
  "/admin/createProduct",
  isAuthenticatedUser,
  authorizeRole("admin"),
  createProduct
);
productRouter.get("/products", getAllProduct);
productRouter.get("/product/:id", getProductDetails);
productRouter.put("/review", isAuthenticatedUser, createReview);
productRouter.get("/reviews", getAllReviews);
productRouter.delete("/reviews", isAuthenticatedUser, deleteReview);

export default productRouter;
