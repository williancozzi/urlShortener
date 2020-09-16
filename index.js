import express from "express";
import mongoose from "mongoose";
import { url } from "./url.js";
import { linkRouter } from "./linkRouter.js";

(async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Succesfully connected!!");
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
})();

const app = express();
app.use(express.json());

app.use(linkRouter);
app.listen(3000, () => console.log("API started!"));
