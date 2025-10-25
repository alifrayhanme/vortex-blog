const jwt = require("jsonwebtoken");
const moment = require("moment");

const generateToken = (
  userId,
  role,
  expires,
  type,
  secret = process.env.JWT_SECRET
) => {
  if (!userId || !role || !expires || !type) {
    throw new Error(
      "Missing required parameters: userId, role, expires, and type are required"
    );
  }

  if (!secret) {
    throw new Error("JWT secret is required");
  }

  const payload = {
    sub: userId,
    role,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };

  try {
    return jwt.sign(payload, secret, {
      algorithm: "HS256",
      encoding: "utf8",
    });
  } catch (error) {
    throw new Error(`Token generation failed: ${error.message}`);
  }
};

module.exports = { generateToken };
