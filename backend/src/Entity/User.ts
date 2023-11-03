import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import bcrypt from "bcrypt";
import { Reviews } from "./Reviews";
import { Orders } from "./Order";
import { ShippingInfo } from "./Shipping";
import { PaymentInfo } from "./Payment";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import * as dotenv from "dotenv";

dotenv.config();

import {
  IsEmail,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsPhoneNumber,
  isEmail,
  Length,
  IsStrongPassword,
} from "class-validator";
export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  createdAt: Date;
  reviews?: Reviews[];
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
}

@Entity("user")
export class User implements UserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(20, {
    message: "First name should be no more than 20 characters long.",
  })
  firstName: string;

  @Column()
  @MaxLength(20, {
    message: "Last name should be no more than 20 characters long.",
  })
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({ unique: true })
  @IsPhoneNumber("IN") // 'null' here assumes it's a general validation. If you know the country code, replace null with it.
  @MinLength(10, {
    message: "Phone number should be of 10 digits",
  })
  @MaxLength(10, {
    message: "Phone number should be of 10 digits",
  })
  phone: string;

  @Column()
  password: string;

  @Column({ default: "user" })
  role: string;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({ type: "boolean", default: true })
  isActive: boolean;

  @OneToMany(() => Reviews, (review) => review.user)
  reviews: Reviews[];

  @OneToMany(() => Orders, (orders) => orders.user)
  orders: Orders[];

  @OneToMany(() => ShippingInfo, (shippingInfo) => shippingInfo.user)
  shippingInfo: ShippingInfo[];

  @OneToMany(() => PaymentInfo, (paymentInfo) => paymentInfo.user)
  paymentInfo: PaymentInfo[];

  @Column({ type: "varchar", nullable: true })
  resetPasswordToken: string | undefined;

  @Column({ type: "timestamp", nullable: true })
  resetPasswordExpire: Date | undefined;

  // JWT TOKEN
  getJWTToken(): string {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET must be defined!");
    }
    return jwt.sign({ id: this.id }, JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  getResetPasswordToken(): string {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.resetPasswordExpire = new Date(Date.now() + 5 * 60 * 1000);

    return resetToken;
  }
}

// HASHING PASSWORD

const saltRounds = 10;

export const hashPassword = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

// COMPARE PASSWORD

export const comparePassword = async (
  enteredPassword: string,
  password: string
): Promise<boolean> => {
  return await bcrypt.compare(enteredPassword, password);
};
