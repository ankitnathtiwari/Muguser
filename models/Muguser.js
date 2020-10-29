const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  mypost: { type: Array },
  impPost: { type: Array },
  followers: { type: Array },
  following: { type: Array },
  likes: { type: Array },
});

const Muguser = mongoose.model("Muguser", userSchema);

module.exports = Muguser;
