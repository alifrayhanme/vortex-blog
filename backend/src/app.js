const express = require("express");
const { join } = require("node:path");
const defaultMiddlewares = require("./middlewares/defaults.middleware.js");
const { connectDB, checkConnection } = require("./server/server.js");
const { handleShutdown } = require("./utils/utils.js");
const allRoutes = require("./routes/index.js");
const dotenv = require("dotenv");

dotenv.config({ path: join(__dirname, "..", ".env") });

const PORT = process.env.PORT || 9000;

const app = express();

defaultMiddlewares(app);

if (!checkConnection()) {
    connectDB(process.env.MONGODB_URI);
}

app.get("/", function (_, res) {
    res.send({
        ok: true,
        message: "Home route",
    });
});

app.use("/api/v1", allRoutes);

app.use(function (_, res) {
    res.send({ message: "Route not found" });
});

const server = app.listen(PORT, function () {
    console.log(`Listening at http://localhost:${PORT}`);
});

process.on("SIGTERM", () => handleShutdown(server));
process.on("SIGINT", () => handleShutdown(server));
