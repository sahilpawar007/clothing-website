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
exports.deleteReview = exports.getAllReviews = exports.createReview = exports.getProductDetails = exports.getAllProduct = exports.createProduct = void 0;
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const data_source_1 = require("../data-source");
const Product_1 = require("../Entity/Product");
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const Reviews_1 = require("../Entity/Reviews");
const User_1 = require("../Entity/User");
const userRepository = data_source_1.myDataSource.getRepository(User_1.User);
const productRepository = data_source_1.myDataSource.getRepository(Product_1.Product);
const reviewRepository = data_source_1.myDataSource.getRepository(Reviews_1.Reviews);
exports.createProduct = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield productRepository.create(Object.assign({}, req.body));
    yield productRepository.save(newProduct);
    res.send({
        status: 200,
        data: newProduct,
    });
}));
exports.getAllProduct = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resultPerPage = 4;
    const productCount = yield productRepository.count();
    const queryBuilder = productRepository.createQueryBuilder("product");
    const apiFeature = new apiFeatures_1.default(queryBuilder, req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const products = yield apiFeature.query.getMany();
    res.send({
        status: 200,
        products,
        productCount,
        resultPerPage,
    });
}));
exports.getProductDetails = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.product) === null || _a === void 0 ? void 0 : _a.id;
    const getProduct = yield productRepository.findOneBy({ id: id });
    if (!getProduct) {
        return next(new errorHandler_1.default("Product not found", 404));
    }
    res.send({
        status: 200,
        getProduct,
    });
}));
// REVIEWS
// Create/Update Reviews
exports.createReview = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d;
    const { rating, comment, productId } = req.body;
    if (!((_b = req.user) === null || _b === void 0 ? void 0 : _b.id) || !productId) {
        return next(new errorHandler_1.default("Required data not provided", 400));
    }
    const product = yield productRepository.findOne({
        where: { id: Number(productId) },
        relations: ["reviews", "reviews.product"],
    });
    const user = yield userRepository.findOne({
        where: { id: Number(req.user.id) },
        relations: ["reviews", "reviews.user"],
    });
    if (!product) {
        return next(new errorHandler_1.default("No Product Found", 404));
    }
    if (!user) {
        return next(new errorHandler_1.default("No User Found", 404));
    }
    const review = {
        user: user,
        name: `${(_c = req.user) === null || _c === void 0 ? void 0 : _c.firstName} ${(_d = req.user) === null || _d === void 0 ? void 0 : _d.lastName}`,
        rating: Number(rating),
        comment,
    };
    const isReviewed = product.reviews.some((rev) => { var _a; return rev.user && rev.user.id === ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); });
    if (isReviewed) {
        product.reviews.forEach((rev) => {
            var _a;
            if (Number(rev.user.id) === Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    }
    else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;
    yield productRepository.save(product);
    res.send({
        status: 200,
    });
}));
// // Get All Reviews
exports.getAllReviews = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.query.id);
    const product = yield productRepository.findOne({
        where: { id: id },
        relations: ["reviews"],
    });
    if (!product) {
        return next(new errorHandler_1.default("Product not found", 404)); // Assuming ErrorHandler is a custom error handling class you have
    }
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
}));
// // Delete Review
exports.deleteReview = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const reviewId = Number(req.query.id);
    const review = yield reviewRepository.findOne({
        where: { id: reviewId },
        relations: ["product"],
    });
    if (!review) {
        return next(new errorHandler_1.default("Review not found", 404)); // Assuming ErrorHandler is a custom error handling class you have
    }
    if (review.user.id === ((_e = req.user) === null || _e === void 0 ? void 0 : _e.id)) {
        yield reviewRepository.remove(review);
    }
    else {
        return next(new errorHandler_1.default("You can't delete others review", 401)); // Assuming ErrorHandler is a custom error handling class you have
    }
    const product = yield productRepository.findOne({
        where: { id: review.product.id },
        relations: ["reviews"],
    });
    if (!product) {
        return next(new errorHandler_1.default("Product not found", 404));
    }
    let avg = 0;
    product === null || product === void 0 ? void 0 : product.reviews.forEach((rev) => {
        avg += rev.rating;
    });
    if ((product === null || product === void 0 ? void 0 : product.reviews.length) === 0) {
        product.ratings = 0;
    }
    else {
        product.ratings = avg / (product === null || product === void 0 ? void 0 : product.reviews.length);
    }
    product.numOfReviews = product === null || product === void 0 ? void 0 : product.reviews.length;
    yield productRepository.save(product);
    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
}));
//# sourceMappingURL=ProductController.js.map