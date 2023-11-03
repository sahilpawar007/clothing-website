"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.authorizeRole = exports.isAuthenticatedUser = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const catchAsyncErrors_1 = require("./catchAsyncErrors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../Entity/User");
const data_source_1 = require("../data-source");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.isAuthenticatedUser = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    // JWT Secret Key
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!token) {
        return next(new errorHandler_1.default("Please login to access this route", 401));
    }
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET must be defined!");
    }
    const userRepository = data_source_1.myDataSource.getRepository(User_1.User);
    const decodedData = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    req.user = yield userRepository.findOne({ where: { id: decodedData.id } });
    next();
}));
const authorizeRole = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.user) {
            return next(new errorHandler_1.default("User data not available", 403));
        }
        if (!roles.includes(req.user.role)) {
            return next(new errorHandler_1.default(`Role : ${req.user.role} is not allowed to access this resource`, 403));
        }
        next();
    });
};
exports.authorizeRole = authorizeRole;
//# sourceMappingURL=auth.js.map