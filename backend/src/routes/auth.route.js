const { Router, urlencoded } = require("express");
const {
  registerUser,
  loginUser,
} = require("../controllers/auth.controller.js");
const {
  checkAuthentication,
  checkAuthorization,
} = require("../middlewares/checkAuth.middleware.js");
const router = Router();

router.use(urlencoded({ extended: true }));

router.post("/register", registerUser);
router.post("/login", loginUser);

// Check for Private routes authentication
router.post("/test", checkAuthentication, (req, res) => {
  res.send({
    message: "Private route authentiaction success",
  });
});

// Check for role specific  routes
router.post(
  "/user",
  checkAuthentication,
  (req, res, next) => checkAuthorization(req, res, next, "user"),
  (req, res) => {
    res.send({
      message: "User role authorization successful",
    });
  }
);

router.post(
  "/admin",
  checkAuthentication,
  (req, res, next) => checkAuthorization(req, res, next, "admin"),
  (req, res) => {
    res.send({
      message: "Admin role authorization successful",
    });
  }
);

module.exports = router;
