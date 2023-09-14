import { Request, Response, NextFunction } from "express";
import { User, comparePassword, hashPassword } from "../Entity/User";
import { myDataSource } from "../data-source";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import sendToken from "../utils/jwtToken";
import ErrorHandler from "../utils/errorHandler";

const userRepository = myDataSource.getRepository(User);

// REGISTER
export const userRegister = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const user = await userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      return next(new ErrorHandler("User already exist", 401));
    }

    // Hash the password before saving the user

    const hashedPassword = await hashPassword(req.body.password);

    let newUser = userRepository.create({
      ...req.body,
      password: hashedPassword,
    });

    await userRepository.save(newUser);

    res.send({
      status: 200,
      data: newUser,
    });
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

    sendToken(user.id, 200, res);
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
    // const email = req.body;

    const id = req.user?.id;

    const user = await userRepository.findOne({ where: { id: id } });
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    if (req.body.email) {
      const userEmails = await userRepository.findOne({
        where: { email: req.body.email },
      });

      // userEmails = cheacks if there is an user with the same email
      // userEmails.id !== id = it checks if the email is same as the current email in db
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
