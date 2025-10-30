const { Router, json } = require("express");
const userRouter = require("./users.route.js");
const postRouter = require("./posts.route.js");
const authRouter = require("./auth.route.js");
const likesRouter = require("./likes.route.js");
const commentsRouter = require("./comments.route.js");
const { uploadImage } = require("../controllers/image.controller.js");
const bodyParser = require("body-parser");
const { upload } = require("../configs/cloudinary.config.js");

const router = Router();

router.use("/user", userRouter);
router.use("/users", userRouter);
router.use("/post", postRouter);
router.use("/auth", json(), authRouter);
router.use("/likes", likesRouter);
router.use("/comments", commentsRouter);

router.post(
    "/upload-image",
    bodyParser.urlencoded({ extended: true }),
    upload.single("image"),
    uploadImage
);

module.exports = router;
