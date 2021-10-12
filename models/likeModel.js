const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    // ref: "product",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  isLike: {
    type: Boolean,
    default: true,
  },
});
module.exports = mongoose.model("like", likeSchema);
