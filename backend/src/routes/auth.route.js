const { Router, urlencoded } = require("express");
const { registerUser } = require("../controllers/auth.controller.js");
const router = Router();

router.use(urlencoded({ extended: true }));

router.post("/register", registerUser);

module.exports = router;
