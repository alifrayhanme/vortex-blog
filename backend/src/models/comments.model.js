const { Schema, model, pluralize } = require("mongoose");

pluralize(null);

const commentSchema = new Schema(
    {
        post_id: {
            type: Schema.Types.ObjectId,
            ref: "Posts",
        },
        commentor_id: {
            type: Schema.Types.ObjectId,
            index: true,
            ref: "Users",
        },
        comment: {
            type: String,
        },
    },
    { timestamps: true }
);

const Comment = model("Comment", commentSchema, "comments");

module.exports = {
    Comment,
};
