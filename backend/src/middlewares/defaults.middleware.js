const { static } = require("express");
const { join } = require("node:path");
const morgan = require("morgan");
const helmet = require("helmet");

// console.log(__dirname);

module.exports = function (app) {
    app.use(morgan("dev"));
    app.use(helmet());
    app.use(static(join(__dirname, "..", "..", "public")));
};
