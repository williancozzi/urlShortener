import express from "express";
import { linkModel } from "./linkModel.js";
import shortid from "shortid";

const app = express();

shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
);

app.get("/urls", async (req, res) => {
  try {
    const urls = await linkModel.find({});

    res.send(urls);
    console.log(shortid.generate());
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/:shortened", async (req, res) => {
  let { shortened } = req.params;

  try {
    const urls = await linkModel.findOne({
      shortenedUrl: shortened,
    });

    res.send(urls);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/create/:value", async (req, res) => {
  let newUrl = {
    url: req.params.value,
    shortenedUrl: shortid.generate(),
  };

  try {
    const data = new linkModel(newUrl);
    const url = await data.save();

    res.send(url);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export { app as linkRouter };
