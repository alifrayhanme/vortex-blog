const { hash } = require("bcrypt");
const { Schema, model, pluralize } = require("mongoose");

pluralize(null);

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            maxLength: [
                30,
                "Maximum character length is name is 30. You entered more than 30 character",
            ],
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "Email pattern mismatch, it must match following pattern: user@example.com",
            ],
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "user",
        },
        picture_url: {
            type: String,
            default:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    this.password = await hash(this.password, 10);

    next();
});

const User = model("Users", userSchema, "users");

module.exports = {
    User,
};
