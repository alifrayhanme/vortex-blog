const { Router, json } = require("express");
const commentsController = require("../controllers/comments.controller");

const router = Router();

router.use(json());
router.get("/:postId", commentsController.getComments);
router.post("/:postId", commentsController.addComment);
router.delete("/:commentId", commentsController.deleteComment);

module.exports = router;
