import { EntitySchema } from "typeorm";
import bcrypt from "bcrypt";

export interface UserType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  createdAt: Date;
}

export const User = new EntitySchema<UserType>({
  name: "user",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});

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
