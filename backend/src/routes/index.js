const { Router } = require("express");
const userRouter = require("./users.route.js");
const postRouter = require("./posts.route.js");
const { uploadImage } = require("../controllers/image.controller.js");
const bodyParser = require("body-parser");
const { upload } = require("../configs/cloudinary.config.js");

const router = Router();

router.use("/user", userRouter);
router.use("/post", postRouter);

router.post(
    "/upload-image",
    bodyParser.urlencoded({ extended: true }),
    upload.single("image"),
    uploadImage
);

module.exports = router;
