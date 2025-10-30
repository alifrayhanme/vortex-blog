const { Schema, model, pluralize } = require("mongoose");

pluralize(null);

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true,
            maxLength: [
                80,
                "Maximum character length in title is 80. You entered more than 80 character",
            ],
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
        category: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            index: true,
        },
        image_url: {
            type: String,
            default: "/assets/default-post-image.webp",
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Post = model("Posts", postSchema, "posts");

module.exports = {
    Post,
};
