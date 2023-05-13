import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import connectDB from "./config/connectDB.js";
import routers from "./api/index.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// router
routers(app)

const PORT = process.env.PORT || 3001;
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log("app listen on port: ", PORT));
  })
  .catch((err) => console.log(`${err} did not connect`));
