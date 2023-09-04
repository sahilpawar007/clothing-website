import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.SQL_HOST,
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASS,
  database: process.env.SQL_DATABASE,
  entities: [],
  synchronize: true,
  logging: true,
});
