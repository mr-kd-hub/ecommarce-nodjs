const likeModel = require("../models/likeModel");
const productModel = require("../models/productModel");

//like dislike product
const likeProduct = async (req, res) => {
  const productId = req.params.productId;
  //user id from auth middle ware
  const userId = req._id;
  if (productId === "" || userId === "") {
    return res.send({ success: false, message: "Please Try Agin...." });
  }
  try {
    const checkForLike = await likeModel.find({ productId, userId });
    if (checkForLike.length !== 0) {
      const dislike = await likeModel.remove({ productId, userId });
      if (dislike)
        return res.send({ success: true, message: "Disliked...", dislike });
    } else {
      const likeProd = new likeModel({
        productId,
        userId,
      });
      const like = await likeProd.save();
      if (like) return res.send({ success: true, message: "liked...", like });
    }
  } catch (err) {
    return res.send({
      success: false,
      message: "Something Wrong...",
      err: err.message,
    });
  }
};

//get most liked products
const mostLiked = async (req, res) => {
  try {
    const likedProd = await likeModel.aggregate([
      {
        $group: { _id: { productId: "$productId" }, likes: { $sum: 1 } },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id.productId",
          foreignField: "_id",
          as: "productsDetails",
        },
      },
    ]);

    //decending order
    likedProd.sort((a, b) => b.likes - a.likes);

    res.send({ success: true, message: "most liked products.", likedProd });
  } catch (err) {
    return res.send({
      succeess: false,
      message: "some thing wrong..",
      err: err.message,
    });
  }
};
module.exports = { likeProduct, mostLiked };
