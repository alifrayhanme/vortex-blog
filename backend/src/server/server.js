const { connect, disconnect, connection } = require("mongoose");

async function connectDB(connURI) {
    try {
        await connect(connURI);

        if (connection.readyState > 0) {
            console.log("Database connected");
        }
    } catch (err) {
        console.error(err);
    }
}

async function disconnectDB() {
    try {
        await disconnect();
    } catch (err) {
        console.error(err);
    }
}

function checkConnection() {
    return connection.readyState > 0 ? true : false;
}

module.exports = { connectDB, disconnectDB, checkConnection };
