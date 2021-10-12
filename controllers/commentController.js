const commentModel = require("../models/commentModel");

const postComment = async (req, res) => {
  const productId = req.params.productId;
  //user id from auth middle ware
  const userId = req._id;
  const comment = req.body.comment;
  try {
    if (productId === "" || userId === "") {
      return res.send({ success: false, message: "Please Try Agin..." });
    }
    if (comment === "") {
      return res.send({ success: false, message: "Comment is required..." });
    }
    const commentData = new commentModel({
      userId,
      productId,
      comment,
    });
    const commentedProd = await commentData.save();
    if (commentedProd)
      return res.send({
        success: true,
        message: "Comment Adedd...",
        commentedProd,
      });
    else
      return res.send({
        success: false,
        message: "Comment not Adedd...",
        commentedProd,
      });
  } catch (err) {
    return res.send({
      success: true,
      message: "Somthing Went Wrong...",
      err: err.message,
    });
  }
  res.send({ productId, userId, comment });
};

//shoe product wise comments
const comments = (req, res) => {};
module.exports = { postComment, comments };
