const { Like } = require("../models/likes.model");

async function getLikes(req, res) {
    try {
        const likes = await Like.find({ post_id: req.params.postId });

        res.status(200).send({
            ok: true,
            message: "Likes found",
            data: likes,
        });
    } catch (err) {
        res.status(500).send({
            ok: false,
            message: "Something went wrong",
            error: err instanceof Error ? err.message : err,
        });
    }
}

async function addLike(req, res) {
    try {
        const likeExist = await Like.find(
            {
                post_id: req.params.postId,
                liker_id: req.body.liker_id,
            },
            { _id: 1 }
        );

        if (likeExist.length > 0) {
            await Like.findByIdAndDelete(likeExist[0]["_id"]);

            res.status(200).send({
                ok: true,
                message: "Like deleted",
            });
        } else {
            const result = await Like.create({
                post_id: req.params.postId,
                liker_id: req.body.liker_id,
            });

            res.status(201).send({
                ok: true,
                message: "Like added",
                data: result,
            });
        }
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
    getLikes,
    addLike,
};
