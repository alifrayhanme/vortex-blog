const { Router, json, urlencoded } = require("express");
const userController = require("../controllers/users.controller");

const router = Router();

router.use(json());
router.use(urlencoded({ extended: true }));

router.get("/", userController.getAllUser);
router.get("/:id", userController.getUser);
router.post("/create", userController.createUser);

module.exports = router;
