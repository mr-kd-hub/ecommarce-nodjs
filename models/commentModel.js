const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "product",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
});
module.exports = mongoose.model("comment", commentSchema);
