import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
// import { User } from "./Entity/User";

dotenv.config();

export const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.SQL_HOST,
  port: 3306,
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DATABASE,
  entities: [`${__dirname}/Entity/*`],
  synchronize: true,
  logging: true,
});
