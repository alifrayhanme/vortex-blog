const { Router, urlencoded } = require("express");
const {
  registerUser,
  loginUser,
} = require("../controllers/auth.controller.js");
const router = Router();

router.use(urlencoded({ extended: true }));

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
