import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import { myDataSource } from "../data-source";
import { Product } from "../Entity/Product";
import ApiFeatures, { QueryString } from "../utils/apiFeatures";
import ErrorHandler from "../utils/errorHandler";
import { Reviews } from "../Entity/Reviews";
import { User, UserType } from "../Entity/User";

const userRepository = myDataSource.getRepository(User);
const productRepository = myDataSource.getRepository(Product);
const reviewRepository = myDataSource.getRepository(Reviews);

export const createProduct = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const newProduct = await productRepository.create({ ...req.body });

    await productRepository.save(newProduct);

    res.send({
      status: 200,
      data: newProduct,
    });
  }
);

export const getAllProduct = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const resultPerPage = 4;
    const productCount = await productRepository.count();

    const queryBuilder = productRepository.createQueryBuilder("product");
    const apiFeature = new ApiFeatures(queryBuilder, req.query as QueryString)
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await apiFeature.query.getMany();

    res.send({
      status: 200,
      products,
      productCount,
      resultPerPage,
    });
  }
);

export const getProductDetails = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.product?.id;
    const getProduct = await productRepository.findOneBy({ id: id });

    if (!getProduct) {
      return next(new ErrorHandler("Product not found", 404));
    }
    res.send({
      status: 200,
      getProduct,
    });
  }
);

// REVIEWS

// Create/Update Reviews
export const createReview = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { rating, comment, productId } = req.body;

    if (!req.user?.id || !productId) {
      return next(new ErrorHandler("Required data not provided", 400));
    }

    const product = await productRepository.findOne({
      where: { id: Number(productId) },
      relations: ["reviews", "reviews.product"],
    });

    const user = await userRepository.findOne({
      where: { id: Number(req.user.id) },
      relations: ["reviews", "reviews.user"],
    });

    if (!product) {
      return next(new ErrorHandler("No Product Found", 404));
    }

    if (!user) {
      return next(new ErrorHandler("No User Found", 404));
    }

    const review = {
      user: user,
      name: `${req.user?.firstName} ${req.user?.lastName}`,
      rating: Number(rating),
      comment,
    };

    const isReviewed = product.reviews.some(
      (rev) => rev.user && rev.user.id === req.user?.id
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (Number(rev.user.id) === Number(req.user?.id)) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      product.reviews.push(review as Reviews);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await productRepository.save(product);

    res.send({
      status: 200,
    });
  }
);

// // Get All Reviews

export const getAllReviews = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.query.id);
    const product = await productRepository.findOne({
      where: { id: id },
      relations: ["reviews"],
    });

    if (!product) {
      return next(new ErrorHandler("Product not found", 404)); // Assuming ErrorHandler is a custom error handling class you have
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  }
);

// // Delete Review

export const deleteReview = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = Number(req.query.id);
    const review = await reviewRepository.findOne({
      where: { id: reviewId },
      relations: ["product"],
    });

    if (!review) {
      return next(new ErrorHandler("Review not found", 404)); // Assuming ErrorHandler is a custom error handling class you have
    }

    if (review.user.id === req.user?.id) {
      await reviewRepository.remove(review);
    } else {
      return next(new ErrorHandler("You can't delete others review", 401)); // Assuming ErrorHandler is a custom error handling class you have
    }

    const product = await productRepository.findOne({
      where: { id: review.product.id },
      relations: ["reviews"],
    });

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    let avg = 0;

    product?.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    if (product?.reviews.length === 0) {
      product.ratings = 0;
    } else {
      product.ratings = avg / product?.reviews.length;
    }

    product.numOfReviews = product?.reviews.length;

    await productRepository.save(product);

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  }
);
