const { Router, json } = require("express");
const likesController = require("../controllers/likes.controller");

const router = Router();

router.use(json());
router.get("/:postId", likesController.getLikes);
router.post("/:postId", likesController.addLike);

module.exports = router;