import mongoose from "mongoose";

const linkSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  shortenedUrl: {
    type: String,
  },
});

const linkModel = mongoose.model("url", linkSchema);

export { linkModel };
