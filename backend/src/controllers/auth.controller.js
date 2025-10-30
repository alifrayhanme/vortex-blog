const User = require("../models/users.model.js");
const jwt = require("jsonwebtoken");
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
      ...(userBody.picture_url && { picture_url: userBody.picture_url }),
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

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: process.env.JWT_ACCESS_EXPIRATION_MINUTES * 60 * 1000,
      domain: process.env.COOKIE_DOMAIN || "localhost",
    });

    res.send({
      success: true,
      message: "Login successful!",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        picture_url: user.picture_url,
        lastLogin: user.lastLogin,
      },
      accessToken: accessToken,
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

async function logoutUser(req, res) {
  try {
    res.cookie("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful!",
    });
  } catch (err) {
    console.error("Logout error:", err);

    res.cookie("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    });

    res.status(500).json({
      success: false,
      message: "Logout failed",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
}
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
