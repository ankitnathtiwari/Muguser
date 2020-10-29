const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Heading: { type: String, required: true },
  Post_Content: { type: String, required: true },
  Author: { type: String, required: true },
  Likes: { type: String },
  Published_Date: { type: Date },
  Modified_Date: { type: Date },
  productImage: { type: String },
});

const MuguserPost = mongoose.model("MuguserPost", userSchema);

module.exports = MuguserPost;
