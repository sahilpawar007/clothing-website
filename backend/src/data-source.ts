import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: process.env.SQL_PASS,
  database: "clothing_website",
  entities: [],
  synchronize: true,
  logging: true,
});
