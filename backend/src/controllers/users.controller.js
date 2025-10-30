const User = require("../models/users.model.js");

async function getAllUser(req, res) {
    const queryNames = Object.getOwnPropertyNames(req.query);

    if (queryNames.length > 0) return getSpecificUser(req, res, queryNames);

    try {
        const result = await User.find();

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
        const result = await User.find(newObj);

        if (!result) {
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
        const result = await User.findById(req.params.id);

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

// async function createUser(req, res) {
//   try {
//     const result = await User.create({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     res.status(201).send({
//       ok: true,
//       message: "User created",
//       data: result,
//     });
//   } catch (err) {
//     res.status(404).send({
//       ok: false,
//       message: "Something went wrong",
//       error: err instanceof Error ? err.message : err,
//       errorType: err instanceof Error ? err.name : "Error",
//     });
//   }
// }

async function updateUser(req, res) {
    try {
        const result = await User.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                bio: req.body.bio,
                picture_url: req.body.picture_url,
            },
            { new: true }
        );

        if (!result) {
            return res.status(404).send({
                ok: false,
                message: "User not found",
                error: "No User Found",
                errorType: "NotFound",
            });
        }

        res.status(200).send({
            ok: true,
            message: "User updated successfully",
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

async function updateUserStatus(req, res) {
    try {
        const result = await User.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!result) {
            return res.status(404).send({
                ok: false,
                message: "User not found",
                error: "No User Found",
                errorType: "NotFound",
            });
        }

        res.status(200).send({
            ok: true,
            message: "User status updated successfully",
            data: result,
        });
    } catch (err) {
        res.status(500).send({
            ok: false,
            message: "Something went wrong",
            error: err instanceof Error ? err.message : err,
            errorType: err instanceof Error ? err.name : "Error",
        });
    }
}

async function deleteUser(req, res) {
    try {
        const result = await User.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).send({
                ok: false,
                message: "User not found",
                error: "No User Found",
                errorType: "NotFound",
            });
        }

        res.status(200).send({
            ok: true,
            message: "User deleted successfully",
            data: result,
        });
    } catch (err) {
        res.status(500).send({
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
    updateUser,
    updateUserStatus,
    deleteUser,
};
