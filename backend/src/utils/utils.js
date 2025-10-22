const { disconnectDB } = require("../server/server.js");

function handleShutdown(app) {
    app.close(function () {
        console.log("Closing app");
        disconnectDB();
        process.exit(1);
    });
}

module.exports = { handleShutdown };
