import app from "./app";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";

dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello Vegeta!");
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
