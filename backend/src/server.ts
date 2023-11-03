import app from "./app";
import * as dotenv from "dotenv";
import { myDataSource } from "./data-source";
import IP from "ip";

dotenv.config();

app.get("/", (req, res) => {
  const ipAddress = IP.address();
  res.send(ipAddress);
});
//

myDataSource
  .initialize()
  .then(() => {
    console.log("Database Connected!!!!");
    const server = app.listen(process.env.PORT, () => {
      console.log(`Server is working on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
