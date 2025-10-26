// const jwt = require("jsonwebtoken");
// const moment = require("moment");

// const generateToken = (
//   userId,
//   role,
//   expires,
//   type,
//   secret = process.env.JWT_SECRET
// ) => {
//   if (!userId || !role || !expires || !type) {
//     throw new Error(
//       "Missing required parameters: userId, role, expires, and type are required"
//     );
//   }

//   if (!secret) {
//     throw new Error("JWT secret is required");
//   }

//   const payload = {
//     sub: userId,
//     role,
//     iat: moment().unix(),
//     exp: expires.unix(),
//     type,
//   };

//   try {
//     return jwt.sign(payload, secret, {
//       algorithm: "HS256",
//       encoding: "utf8",
//     });
//   } catch (error) {
//     throw new Error(`Token generation failed: ${error.message}`);
//   }
// };

// module.exports = { generateToken };

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

const generateAccessToken = (userId, role) => {
  const accessTokenExpires = moment().add(
    parseInt(process.env.JWT_ACCESS_EXPIRATION_MINUTES) || 15,
    "minutes"
  );

  return generateToken(userId, role, accessTokenExpires, "access");
};

const generateRefreshToken = (userId, role) => {
  const refreshTokenExpires = moment().add(
    parseInt(process.env.JWT_REFRESH_EXPIRATION_DAYS) || 7,
    "days"
  );

  return generateToken(
    userId,
    role,
    refreshTokenExpires,
    "refresh",
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET
  );
};

const verifyRefreshToken = (token) => {
  const secret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  return jwt.verify(token, secret);
};

const decodeToken = (token) => {
  return jwt.decode(token);
};

module.exports = {
  generateToken,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  decodeToken,
};
