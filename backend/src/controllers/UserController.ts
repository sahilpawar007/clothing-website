import { Request, Response, NextFunction } from "express";
import { User, comparePassword, hashPassword } from "../Entity/User";
import { myDataSource } from "../data-source";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import sendToken from "../utils/jwtToken";
import ErrorHandler from "../utils/errorHandler";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";
import { MoreThan } from "typeorm";
import { validate } from "class-validator";

const userRepository = myDataSource.getRepository(User);

// REGISTER
export const userRegister = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, phone, password } = req.body;

    const user = await userRepository.findOne({
      where: {
        email: email,
      },
    });

    const userPhone = await userRepository.findOne({
      where: {
        phone: phone,
      },
    });

    if (user) {
      return next(new ErrorHandler("User already exist", 400));
    }

    if (userPhone) {
      return next(new ErrorHandler("Phone Number already used", 400));
    }

    if (password.length < 8) {
      return next(
        new ErrorHandler("Password must be greater than 8 characters", 400)
      );
    }

    // Hash the password before saving the user

    const hashedPassword = await hashPassword(req.body.password);

    let newUser: User[] = userRepository.create({
      ...req.body,
      password: hashedPassword,
    });

    const errors = await validate(newUser);

    if (errors.length > 0) {
      const validationErrors = errors
        .map((error) => Object.values(error.constraints!))
        .join(", ");
      return next(new ErrorHandler(validationErrors, 400));
    }

    await userRepository.save(newUser);

    sendToken(newUser, 200, res);
  }
);

// LOGIN

export const userLogin = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Checking if the user has given password and email both
    if (!email || !password) {
      return next(new ErrorHandler("Email and Password are missing", 409));
    }

    const user = await userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return next(new ErrorHandler("User not found", 401));
    }

    const isMatch = await comparePassword(password, user.password as string);

    if (!isMatch) {
      return next(new ErrorHandler("Password is invalid", 401));
    }

    sendToken(user, 200, res);
  }
);

// LOGOUT

export const userLogout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  }
);

// GET USER DETAILS

export const getUserDetails = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;
    const user = await userRepository.findBy({ id });

    res.status(200).json({
      success: true,
      user,
    });
  }
);

// UPDATE PASSWORD

export const updatePassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    //Old Password
    let oldpassword = req.user?.password;
    const id = req.user?.id;

    let { password, newPassword, confirmPassword } = req.body;

    const user = await userRepository.findOne({ where: { id: id } });

    const isMatch = await comparePassword(password, oldpassword as string);

    if (!user) {
      return next(new ErrorHandler("User not found", 401));
    }

    if (!isMatch) {
      return next(new ErrorHandler("Incorrect Old Password", 401));
    }

    if (newPassword !== confirmPassword) {
      return next(new ErrorHandler("Confirm Password doesn't match", 401));
    }

    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;

    await userRepository.save(user);

    sendToken(user.id, 200, res);
  }
);

// UPDATE USER PROFILE

export const updateProfile = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.user?.id;

    const user = await userRepository.findOne({ where: { id: id } });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (req.body.email) {
      const userEmails = await userRepository.findOne({
        where: { email: req.body.email },
      });

      if (userEmails && userEmails.id !== id) {
        return next(new ErrorHandler("Email already exist", 404));
      }
    }

    const updatedUser = userRepository.merge(user, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email ? req.body.email : user.email,
    });

    await userRepository.save(updatedUser);
    res.status(200).json({
      success: true,
    });
  }
);

// FORGOT PASSWORD

export const forgotPassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    // const user = req.user?.id

    const user = await userRepository.findOne({ where: { email: email } });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Get reset password token

    const resetToken = user.getResetPasswordToken();

    await userRepository.save(user);

    const resetPasswordUrl = `http://localhost:4000/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token click the limk to reset password : \n\n ${resetPasswordUrl} \n\n If you have not requested then fuck off`;

    try {
      await sendEmail({
        email: user.email,
        subject: "RZLN Password Reset Link",
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email send to ${user.email} successfully`,
      });
    } catch (error) {
      (user.resetPasswordToken = undefined),
        (user.resetPasswordExpire = undefined);

      await userRepository.save(user);

      return next(new ErrorHandler("AAILA ERROR", 500));
    }
  }
);

// RESET PASSWORD

export const resetPassword = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, confirmPassword } = req.body;

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await userRepository.findOne({
      where: {
        resetPasswordToken,
        resetPasswordExpire: MoreThan(new Date()),
      },
    });

    if (!user) {
      return next(
        new ErrorHandler(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
    if (!password || !confirmPassword) {
      return next(new ErrorHandler("Enter Password", 401));
    }

    if (password !== confirmPassword) {
      return next(new ErrorHandler("Confirm Password doesn't match", 401));
    }

    const hashedPassword = await hashPassword(password);

    user.password;

    user.password = hashedPassword;

    if (
      user.resetPasswordExpire &&
      user.resetPasswordExpire.getTime() < Date.now()
    ) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await userRepository.save(user);
    }

    sendToken(user.id, 200, res);
  }
);
