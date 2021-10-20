const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");
const likeModel = require("../models/likeModel");
//add products
const addProduct = async (req, res) => {
  let title = req.body.title.toLowerCase();
  let category = req.body.category.toLowerCase();
  let price = req.body.price;
  let createdby = req.currentUser.email;
  try {
    if (title === "" || category === "") {
      return res.send({
        success: false,
        message: "All fielsd are required..",
      });
    }
    const result = await categoryModel.find({ title: category });
    if (result.length === 0) {
      return res.send({
        success: false,
        message: "Please Select Valid Category..",
      });
    }
    const productData = new productModel({
      title,
      category,
      price,
      createdby,
    });
    const product = await productData.save();
    return res.send({
      success: true,
      messaeg: "Product Added..",
      product,
    });
  } catch (err) {
    return res.send({
      success: false,
      messaeg: "Error while adding Product...",
      err: err.message,
    });
  }
};

//show all product
const showProduct = async (req, res) => {
  try {
    const products = await productModel.find(
      {},
      { _id: 1, title: 1, price: 1, category: 1 }
    );

    if (products.length === 0) {
      return res.send({
        success: true,
        message: "No Products Found...",
      });
    }
    return res.send({
      success: true,
      message: "All Products Are Fetched...",
      products,
      count: products.length,
    });
  } catch (err) {
    return res.send({
      success: false,
      message: "Error in fetching products...",
      err: err.message,
    });
  }
};

//modify prodcut
const modufyProduct = async (req, res) => {
  const _id = req.params.id;
  const title = req.body.title.toLowerCase();
  const price = req.body.price;
  let createdby = req.currentUser.email;
  const category = req.body.category.toLowerCase();
  try {
    if (title === "" || price === "" || category === "") {
      return res.send({
        success: false,
        message: "All fields are required",
      });
    }
    const validateUser = await productModel.find({ _id, createdby });
    if (validateUser.length === 0) {
      return res.send({
        success: false,
        message: "You cant Modify this product",
      });
    }
    //check for category
    const result = await categoryModel.find({ title: category });
    if (result.length === 0) {
      return res.send({
        success: false,
        message: "Please Select Valid Category..",
      });
    }
    const updatedProduct = await productModel.findByIdAndUpdate(_id, {
      title,
      price,
      category,
    });
    if (updatedProduct) {
      res.send({ success: true, message: "Product udated", updatedProduct });
    } else {
      res.send({ success: false, message: "Product not Found..." });
    }
  } catch (err) {
    return res.send({
      success: false,
      message: "Error in Modifying product...",
      err: err.message,
    });
  }
};

//remove products
const removeProducts = async (req, res) => {
  const _id = req.params.id;
  let createdby = req.currentUser.email;
  try {
    const validateUser = await productModel.find({ _id, createdby });
    if (validateUser.length === 0) {
      return res.send({
        success: false,
        message: "You cant Remove this product",
      });
    }
    const deletedProduct = await productModel.findByIdAndDelete(_id);
    if (deletedProduct) {
      return res.send({
        success: true,
        message: "Product Delted....",
        deletedProduct,
      });
    } else {
      return res.send({
        success: false,
        message: "Product not found ....",
      });
    }
  } catch (err) {
    return res.send({
      success: false,
      message: "Error in delteing Product..",
      err: err.message,
    });
  }
};

//get product by category
const getProductByCategory = async (req, res) => {
  const category = req.query.category.toLowerCase();
  if (category === "") {
    return res.send({ success: false, message: "Please select Category.." });
  }
  //check for category
  const result = await categoryModel.find({ title: category });
  if (result.length === 0) {
    return res.send({
      success: false,
      message: "Please Select Valid Category..",
    });
  }
  const product = await productModel.find(
    { category },
    { _id: 1, title: 1, price: 1 }
  );
  if (product.length === 0) {
    return res.send({
      success: false,
      message: "No product Found Under this category...",
    });
  }
  res.send({
    success: true,
    message: "Product found...",
    product,
    count: product.length,
  });
};

//get most recent products
const recentProduct = async (req, res) => {
  try {
    const products = await productModel.find().sort({ createdAt: -1 }).limit(3);

    if (products) {
      return res.send({
        success: true,
        messaeg: "Most Recent Product Fetched...",
        products,
      });
    }
  } catch (err) {
    return res.send({
      success: false,
      messaeg: "error while  Fetching...",
      err: err.message,
    });
  }
};

module.exports = {
  addProduct,
  showProduct,
  modufyProduct,
  removeProducts,
  getProductByCategory,
  recentProduct,
};
