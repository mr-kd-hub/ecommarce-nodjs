const router = require("express").Router();
const auth = require("../middleware/auth");
const commentController = require("../controllers/commentController");

router.post("/id/:productId", auth, commentController.postComment);

module.exports = router;
