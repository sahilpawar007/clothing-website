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
exports.updateProfile = exports.updatePassword = exports.getUserDetails = exports.userLogout = exports.userLogin = exports.userRegister = void 0;
const User_1 = require("../Entity/User");
const data_source_1 = require("../data-source");
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const jwtToken_1 = __importDefault(require("../utils/jwtToken"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const userRepository = data_source_1.myDataSource.getRepository(User_1.User);
// REGISTER
exports.userRegister = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield userRepository.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        return next(new errorHandler_1.default("User already exist", 401));
    }
    // Hash the password before saving the user
    const hashedPassword = yield (0, User_1.hashPassword)(req.body.password);
    let newUser = userRepository.create(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
    yield userRepository.save(newUser);
    res.send({
        status: 200,
        data: newUser,
    });
}));
// LOGIN
exports.userLogin = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Checking if the user has given password and email both
    if (!email || !password) {
        return next(new errorHandler_1.default("Email and Password are missing", 409));
    }
    const user = yield userRepository.findOne({
        where: {
            email: email,
        },
    });
    if (!user) {
        return next(new errorHandler_1.default("User not found", 401));
    }
    const isMatch = yield (0, User_1.comparePassword)(password, user.password);
    if (!isMatch) {
        return next(new errorHandler_1.default("Password is invalid", 401));
    }
    (0, jwtToken_1.default)(user.id, 200, res);
}));
// LOGOUT
exports.userLogout = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
}));
// GET USER DETAILS
exports.getUserDetails = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    const user = yield userRepository.findBy({ id });
    res.status(200).json({
        success: true,
        user,
    });
}));
// UPDATE PASSWORD
exports.updatePassword = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    //Old Password
    let oldpassword = (_b = req.user) === null || _b === void 0 ? void 0 : _b.password;
    const id = (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
    let { password, newPassword, confirmPassword } = req.body;
    const user = yield userRepository.findOne({ where: { id: id } });
    const isMatch = yield (0, User_1.comparePassword)(password, oldpassword);
    if (!user) {
        return next(new errorHandler_1.default("User not found", 401));
    }
    if (!isMatch) {
        return next(new errorHandler_1.default("Incorrect Old Password", 401));
    }
    if (newPassword !== confirmPassword) {
        return next(new errorHandler_1.default("Confirm Password doesn't match", 401));
    }
    const hashedPassword = yield (0, User_1.hashPassword)(newPassword);
    user.password = hashedPassword;
    yield userRepository.save(user);
    (0, jwtToken_1.default)(user.id, 200, res);
}));
// UPDATE USER PROFILE
exports.updateProfile = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const email = req.body;
    var _d;
    const id = (_d = req.user) === null || _d === void 0 ? void 0 : _d.id;
    const user = yield userRepository.findOne({ where: { id: id } });
    if (!user) {
        return next(new errorHandler_1.default("User not found", 404));
    }
    if (req.body.email) {
        const userEmails = yield userRepository.findOne({
            where: { email: req.body.email },
        });
        // userEmails = cheacks if there is an user with the same email
        // userEmails.id !== id = it checks if the email is same as the current email in db
        if (userEmails && userEmails.id !== id) {
            return next(new errorHandler_1.default("Email already exist", 404));
        }
    }
    const updatedUser = userRepository.merge(user, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email ? req.body.email : user.email,
    });
    yield userRepository.save(updatedUser);
    res.status(200).json({
        success: true,
    });
}));
//# sourceMappingURL=UserController.js.map