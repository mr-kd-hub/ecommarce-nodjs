const router = require("express").Router();
const auth = require("../middleware/auth");
const likeController = require("../controllers/likeControler");

router.post("/prodid/:productId", auth, likeController.likeProduct);
router.get("/mostliked", likeController.mostLiked);

module.exports = router;
