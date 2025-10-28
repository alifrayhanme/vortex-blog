const { Router, json, urlencoded } = require("express");
const userController = require("../controllers/users.controller.js");

const router = Router();

router.use(json());
router.use(urlencoded({ extended: true }));

router.get("/", userController.getAllUser);
router.get("/:userId", userController.getUser);
router.delete("/:userId", userController.deleteUser);

module.exports = router;
