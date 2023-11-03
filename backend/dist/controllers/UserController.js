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
exports.resetPassword = exports.forgotPassword = exports.updateProfile = exports.updatePassword = exports.getUserDetails = exports.userLogout = exports.userLogin = exports.userRegister = void 0;
const User_1 = require("../Entity/User");
const data_source_1 = require("../data-source");
const catchAsyncErrors_1 = require("../middlewares/catchAsyncErrors");
const jwtToken_1 = __importDefault(require("../utils/jwtToken"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const sendEmail_1 = __importDefault(require("../utils/sendEmail"));
const crypto_1 = __importDefault(require("crypto"));
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const userRepository = data_source_1.myDataSource.getRepository(User_1.User);
// REGISTER
exports.userRegister = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, phone, password } = req.body;
    const user = yield userRepository.findOne({
        where: {
            email: email,
        },
    });
    const userPhone = yield userRepository.findOne({
        where: {
            phone: phone,
        },
    });
    if (user) {
        return next(new errorHandler_1.default("User already exist", 400));
    }
    if (userPhone) {
        return next(new errorHandler_1.default("Phone Number already used", 400));
    }
    if (password.length < 8) {
        return next(new errorHandler_1.default("Password must be greater than 8 characters", 400));
    }
    // Hash the password before saving the user
    const hashedPassword = yield (0, User_1.hashPassword)(req.body.password);
    let newUser = userRepository.create(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
    const errors = yield (0, class_validator_1.validate)(newUser);
    if (errors.length > 0) {
        const validationErrors = errors
            .map((error) => Object.values(error.constraints))
            .join(", ");
        return next(new errorHandler_1.default(validationErrors, 400));
    }
    yield userRepository.save(newUser);
    (0, jwtToken_1.default)(newUser, 200, res);
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
    (0, jwtToken_1.default)(user, 200, res);
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
// FORGOT PASSWORD
exports.forgotPassword = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    // const user = req.user?.id
    const user = yield userRepository.findOne({ where: { email: email } });
    if (!user) {
        return next(new errorHandler_1.default("User not found", 404));
    }
    // Get reset password token
    const resetToken = user.getResetPasswordToken();
    yield userRepository.save(user);
    const resetPasswordUrl = `http://localhost:4000/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token click the limk to reset password : \n\n ${resetPasswordUrl} \n\n If you have not requested then fuck off`;
    try {
        yield (0, sendEmail_1.default)({
            email: user.email,
            subject: "RZLN Password Reset Link",
            message,
        });
        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully`,
        });
    }
    catch (error) {
        (user.resetPasswordToken = undefined),
            (user.resetPasswordExpire = undefined);
        yield userRepository.save(user);
        return next(new errorHandler_1.default("AAILA ERROR", 500));
    }
}));
// RESET PASSWORD
exports.resetPassword = (0, catchAsyncErrors_1.catchAsyncErrors)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, confirmPassword } = req.body;
    const resetPasswordToken = crypto_1.default
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    const user = yield userRepository.findOne({
        where: {
            resetPasswordToken,
            resetPasswordExpire: (0, typeorm_1.MoreThan)(new Date()),
        },
    });
    if (!user) {
        return next(new errorHandler_1.default("Reset Password Token is invalid or has been expired", 400));
    }
    if (!password || !confirmPassword) {
        return next(new errorHandler_1.default("Enter Password", 401));
    }
    if (password !== confirmPassword) {
        return next(new errorHandler_1.default("Confirm Password doesn't match", 401));
    }
    const hashedPassword = yield (0, User_1.hashPassword)(password);
    user.password;
    user.password = hashedPassword;
    if (user.resetPasswordExpire &&
        user.resetPasswordExpire.getTime() < Date.now()) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        yield userRepository.save(user);
    }
    (0, jwtToken_1.default)(user.id, 200, res);
}));
//# sourceMappingURL=UserController.js.map