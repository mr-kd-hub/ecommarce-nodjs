const router = require("express").Router();
const auth = require("../middleware/auth");
const productController = require("../controllers/productController");

router.post("/add", auth, productController.addProduct);
router.get("/", productController.showProduct);
router.get("/cat", productController.getProductByCategory);
// router.get("/mostliked", productController.mostLiked);
router.get("/recent", productController.recentProduct);
router.patch("/modi/:id", auth, productController.modufyProduct);
router.delete("/rem/:id", auth, productController.removeProducts);

module.exports = router;
