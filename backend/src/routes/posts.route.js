const { Router, json, urlencoded } = require("express");
const postController = require("../controllers/posts.controller");

const router = Router();

router.use(json());

router.get("/", postController.getPosts);
router.get("/categories", postController.getCategories);
router.get("/user/:userId", postController.getUserPosts);
router.get("/:id", postController.getPost);
router.post(
    "/create",
    urlencoded({ extended: true, limit: "1mb" }),
    postController.createPost
);
router.put("/:id", urlencoded({ extended: true, limit: "1mb" }), postController.updatePost);
router.delete("/:id", postController.deletePost);

router.patch(
    "/:postId",
    urlencoded({ extended: true, limit: "1mb" }),
    postController.editPost
);

router.delete("/:postId", postController.deletePost);
module.exports = router;
