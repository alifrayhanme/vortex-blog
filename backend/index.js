const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

require("dotenv").config();

const PORT = process.env.PORT || 9000;

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.send({
        ok: true,
        message: "Home route",
    });
});

app.listen(PORT, function () {
    console.log(`Listening at http://loccalhost:${PORT}`);
});
