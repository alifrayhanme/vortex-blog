const { Comment } = require("../models/comments.model");

async function getComments(req, res) {
    console.log('getComments called with postId:', req.params.postId);
    try {
        const comments = await Comment.find({ post_id: req.params.postId }).populate('commentor_id', 'name');
        console.log('Found comments:', comments);
        
        res.status(200).send({
            ok: true,
            message: "Comments found",
            data: comments,
        });
    } catch (err) {
        console.error('Error in getComments:', err);
        res.status(500).send({
            ok: false,
            message: "Something went wrong",
            error: err instanceof Error ? err.message : err,
            errorType: err instanceof Error ? err.name : "Error",
        });
    }
}

async function addComment(req, res) {
    console.log('addComment called with postId:', req.params.postId, 'body:', req.body);
    try {
        const comment = await Comment.create({
            post_id: req.params.postId,
            commentor_id: null,
            comment: req.body.comment,
        });
        
        res.status(201).send({
            ok: true,
            message: "Comment added",
            data: comment,
        });
    } catch (err) {
        console.error('Error in addComment:', err);
        res.status(500).send({
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
};