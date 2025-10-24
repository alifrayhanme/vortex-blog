const User = require("../models/users.model.js");

async function registerUser(req, res) {
    const userBody = req.body;

    try {
        if (await User.isEmailTaken(userBody?.email)) {
            return res.status(400).send({
                ok: false,
                message: "Something went wrong",
                error: "Email already taken!",
                errorType: "ExistingValue",
            });
        }

        const user = await User.create({
            name: userBody.name,
            email: userBody.email,
            password: userBody.password,
        });

        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).send({
            ok: true,
            message: "User Registered Successfully",
            data: userResponse,
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            message: "Something went wrong",
            error: err instanceof Error ? err.message : err,
            errorType: err instanceof Error ? err.name : "Error",
        });
    }
}

module.exports = {
    registerUser,
};
