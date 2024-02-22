const mongoose = require("mongoose");

const new_mongoose = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  image: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSchema",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const blogPost = new mongoose.model("blogPost", new_mongoose);
module.exports = blogPost;
