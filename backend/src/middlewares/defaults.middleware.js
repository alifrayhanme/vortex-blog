const { static } = require("express");
const { join } = require("node:path");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

// console.log(__dirname);

module.exports = function (app) {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(static(join(__dirname, "..", "..", "public")));
};
