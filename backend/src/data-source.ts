import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./Entity/User";
import { Product } from "./Entity/Product";
import { Reviews } from "./Entity/Reviews";
import { Images } from "./Entity/Images";
import { Orders } from "./Entity/Order";
import { OrderItems } from "./Entity/OrderItems";
import { ShippingInfo } from "./Entity/Shipping";
import { PaymentInfo } from "./Entity/Payment";

dotenv.config();

export const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.SQL_HOST,
  port: 3306,
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DATABASE,
  entities: [
    User,
    Product,
    Reviews,
    Images,
    Orders,
    OrderItems,
    ShippingInfo,
    PaymentInfo,
  ],
  synchronize: true,
  logging: true,
});
