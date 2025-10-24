const User = require("../models/users.model");

async function registerUser(req, res) {
  const userBody = req.body;

  try {
    if (await User.isEmailTaken(userBody?.email)) {
      return res.status(400).send({
        message: "Email already taken!",
      });
    }

    const user = await User.create({
      ...userBody,
      role: "user",
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).send({
      message: "User Registered Successfully",
      data: userResponse,
    });
  } catch (err) {
    res.status(500).json({
      message: err?.message,
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  console.log(email, password);

  try {
    const user = await User.findOne({ email });

    if (!user || (await user.isPasswordMatch(password))) {
      res.status(401).send({
        success: false,
        message: "Invalid email or password",
        suggestion: "Forgot your password? Consider resetting it",
      });
    }

    res.send({
      success: true,
      message: "Login successful!",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
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
