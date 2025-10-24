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

module.exports = {
  registerUser,
};
