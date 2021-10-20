const categoryModel = require("../models/categoryModel");

const addCategory = (req, res) => {
  let title = req.body.title.toLowerCase();
  let status = req.body.status;
  if (title === "") {
    return res.send({
      success: false,
      message: "title is required",
    });
  }
  try {
    //chek for existance
    categoryModel
      .findOne({ title })
      .then((category) => {
        if (category) {
          return res.send({
            success: false,
            message: "Alredy Exists....",
          });
        }
      })
      .catch((err) => {
        return res.send({
          success: false,
          message: "error in existance category",
          err: err.message,
        });
      });

    const categoryData = new categoryModel({
      title,
      status,
    });
    categoryData
      .save()
      .then((data) => {
        return res.send({ data });
      })
      .catch((err) => {
        return res.send({
          success: false,
          message: "Error in add category....",
          err: err.message,
        });
      });
  } catch (err) {
    return res.send({
      success: false,
      message: "err while add category..",
      err: err.message,
    });
  }
};

//display all category
const showAllcategory = (req, res) => {
  const status = req.query.status;

  categoryModel
    .find({ status }, { title: 1, _id: 1 })
    .then((list) => {
      if (list.length === 0) {
        return res.send({ success: true, message: "No Category Found..." });
      }
      return res.send({ success: true, message: "All category fetched", list });
    })
    .catch((err) => {
      return res.send({
        success: false,
        message: "Error Whlile fetcheing category",
        err: err.message,
      });
    });
};
module.exports = { addCategory, showAllcategory };
