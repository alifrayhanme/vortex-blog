const User = require("../models/users.model.js");

async function getAllUser(req, res) {
    const queryNames = Object.getOwnPropertyNames(req.query);

    if (queryNames.length > 0) return getSpecificUser(req, res, queryNames);

    try {
        const result = await User.find().select(
            "name email role picture_url is_suspended createdAt updatedAt"
        );

        res.status(200).send({
            ok: true,
            message: "Recevied all users",
            data: result,
        });
    } catch (err) {
        res.status(404).send({
            ok: false,
            message: "Something went wrong",
            error: err instanceof Error ? err.message : err,
            errorType: err instanceof Error ? err.name : "Error",
        });
    }
}

async function getSpecificUser(req, res, queryNames) {
    const newObj = {};

    queryNames.forEach((prop) => {
        newObj[prop] = req.query[prop];
    });

    try {
        const result = await User.find(newObj).select(
            "name email role picture_url is_suspended createdAt updatedAt"
        );

        if (result.length < 1) {
            return res.status(404).send({
                ok: false,
                message: "User not found",
                error: "No user found",
                errorType: "NotFound",
            });
        }

        res.status(200).send({
            ok: true,
            message: "User found",
            data: result,
        });
    } catch (err) {
        res.status(404).send({
            ok: false,
            message: "Something went wrong",
            error: err instanceof Error ? err.message : err,
            errorType: err instanceof Error ? err.name : "Error",
        });
    }
}

async function getUser(req, res) {
    try {
        const result = await User.findById(req.params.userid).select(
            "name email role picture_url is_suspended createdAt updatedAt"
        );

        if (!result) {
            return res.status(404).send({
                ok: false,
                error: "No user found",
                errorType: "NotFound",
            });
        }

        res.status(200).send({
            ok: true,
            message: "User found",
            data: result,
        });
    } catch (err) {
        res.status(404).send({
            ok: false,
            message: "Something went wrong",
            error: err instanceof Error ? err.message : err,
            errorType: err instanceof Error ? err.name : "Error",
        });
    }
}

async function deleteUser(req, res) {
    try {
        const result = await User.findByIdAndDelete(req.params.userId);

        if (!result) {
            return res.status(404).send({
                ok: false,
                message: "Something went wrong",
                error: "User not found",
                errorType: "NotFound",
            });
        }

        res.status(200).send({
            ok: true,
            message: "User deleted successfully",
        });
    } catch (err) {
        res.status(404).send({
            ok: false,
            message: "Something went wrong",
            error: err instanceof Error ? err.message : err,
            errorType: err instanceof Error ? err.name : "Error",
        });
    }
}

module.exports = {
    getAllUser,
    getUser,
    deleteUser,
};
