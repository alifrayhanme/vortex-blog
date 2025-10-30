const { Comment } = require("../models/comments.model");

async function getComments(req, res) {
    try {
        const comments = await Comment.find({
            post_id: req.params.postId,
        }).populate("commentor_id", { name: 1, picture_url: 1 });

        res.status(200).send({
            ok: true,
            message: "Comments found",
            data: comments,
        });
    } catch (err) {
        console.error("Error in getComments:", err);
        res.status(404).send({
            ok: false,
            message: "Something went wrong",
            error: err instanceof Error ? err.message : err,
            errorType: err instanceof Error ? err.name : "Error",
        });
    }
}

async function addComment(req, res) {
    try {
        const comment = await Comment.create({
            post_id: req.params.postId,
            commentor_id: req.body.commentor_id,
            comment: req.body.comment,
        });

        res.status(201).send({
            ok: true,
            message: "Comment added",
            data: comment,
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

async function deleteComment(req, res) {
    try {
        const result = await Comment.findByIdAndDelete(req.params.commentId);

        if (!result) {
            return res.status(404).send({
                ok: false,
                message: "Something went wrong",
                error: "Comment not found",
                errorType: "NotFound",
            });
        }

        res.status(200).send({
            ok: true,
            message: "Comment deleted successfully",
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
    getComments,
    addComment,
    deleteComment,
};
