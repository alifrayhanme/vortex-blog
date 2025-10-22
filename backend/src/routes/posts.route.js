const { Router, json, urlencoded } = require("express");
const postController = require("../controllers/posts.controller");

const router = Router();

router.use(json());

router.get("/", postController.getPosts);
router.get("/:id", postController.getPost);
router.post(
    "/create",
    urlencoded({ extended: true, limit: "1mb" }),
    postController.createPost
);

module.exports = router;
