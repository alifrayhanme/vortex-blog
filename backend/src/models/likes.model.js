const { Schema, model, pluralize } = require("mongoose");

pluralize(null);

const likeSchema = new Schema(
    {
        post_id: {
            type: Schema.Types.ObjectId,
            ref: "Posts",
        },
        liker_id: {
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
    },
    { timestamps: true }
);

const Like = model("Likes", likeSchema, "likes");

module.exports = {
    Like,
};
