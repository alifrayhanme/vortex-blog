const User = require("../models/users.model.js");
const { generateToken } = require("../services/token.service.js");
const moment = require("moment");

async function registerUser(req, res) {
  const userBody = req.body;

  try {
    if (await User.isEmailTaken(userBody?.email)) {
      return res.status(400).send({
        ok: false,
        message: "Something went wrong",
        error: "Email already taken!",
        errorType: "ExistingValue",
      });
    }

    const user = await User.create({
      name: userBody.name,
      email: userBody.email,
      password: userBody.password,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).send({
      ok: true,
      message: "User Registered Successfully",
      data: userResponse,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Something went wrong",
      error: err instanceof Error ? err.message : err,
      errorType: err instanceof Error ? err.name : "Error",
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.isPasswordMatch(password))) {
      return res.status(401).send({
        success: false,
        message: "Invalid email or password",
        suggestion: "Forgot your password? Consider resetting it",
      });
    }

    const accessTokenExpires = moment().add(
      process.env.JWT_ACCESS_EXPIRATION_MINUTES,
      "minutes"
    );

    const accessToken = generateToken(
      user._id,
      user.role,
      accessTokenExpires,
      "access"
    );

    res.send({
      success: true,
      message: "Login successful!",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
        access: {
          token: accessToken,
          expires: accessTokenExpires.toDate(),
          expiresIn: process.env.JWT_ACCESS_EXPIRATION_MINUTES * 60,
        },
      },
    });
  } catch (err) {
    console.error("Login error:", err);

    let errorMessage = "Authentication failed";
    let suggestion = "Please try again later";

    if (err.name === "MongoError" || err.name === "MongoNetworkError") {
      errorMessage = "Database connection error";
      suggestion = "Please try again in a few moments";
    }

    return res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
      suggestion: suggestion,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
