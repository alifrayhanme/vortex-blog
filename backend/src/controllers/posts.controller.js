const { Post } = require("../models/posts.model");

async function getPosts(req, res) {
    const queryNames = Object.getOwnPropertyNames(req.query);

    if (queryNames.includes("category")) return getPostWithCategory(req, res);

    if (queryNames.includes("search")) return getPostWithSearchParams(req, res);

    try {
        const limit = req.query.limit || 6;
        const skip = ((req.query.page || 1) - 1) * limit;

        const totalDocumentCount = await Post.countDocuments();
        const maxPage = Math.ceil(totalDocumentCount / limit);

        const result = await Post.find().limit(limit).skip(skip);

        res.status(200).send({
            ok: true,
            message: "Posts found",
            currentPage: req.query.page || 1,
            maxPage,
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

async function getPostWithCategory(req, res) {
    try {
        const limit = req.query.limit || 6;
        const skip = ((req.query.page || 1) - 1) * limit;

        const totalDocumentCount = await Post.countDocuments({
            category: req.query.category,
        });
        const maxPage = Math.ceil(totalDocumentCount / limit);

        const result = await Post.find({ category: req.query.category })
            .limit(limit)
            .skip(skip);

        res.status(200).send({
            ok: true,
            message: "Posts found",
            currentPage: req.query.page || 1,
            maxPage,
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

async function getPostWithSearchParams(req, res) {
    try {
        const result = await Post.find({ title: req.query.search });

        if (!result) {
            return res.status(404).send({
                ok: false,
                message: "Something went wrong",
                error: "No post found",
                errorType: "NotFound",
            });
        }

        res.status(200).send({
            ok: true,
            message: "Post found",
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

async function getPost(req, res) {
    try {
        const result = await Post.findById(req.params.id).populate('author', 'name email picture_url');

        if (!result) {
            return res.status(404).send({
                ok: false,
                message: "Something went wrong",
                error: "No Post Found",
                errorType: "NotFound",
            });
        }

        res.status(200).send({
            ok: true,
            message: "Post found",
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

async function createPost(req, res) {
    const userReq = req.body;

    try {
        const result = await Post.create({
            title: userReq.title,
            author: userReq.author,
            category: userReq.category,
            image_url: userReq.image_url
                ? userReq.image_url
                : "/assets/default-post-image.webp",
            content: userReq.content,
        });

        res.status(201).send({
            ok: true,
            message: "Post created",
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

async function getCategories(req, res) {
    try {
        const categories = await Post.aggregate([
            { $group: { _id: "$category", posts: { $sum: 1 } } },
            { $project: { category: "$_id", posts: 1, _id: 0 } }
        ]);

        res.status(200).send({
            ok: true,
            message: "Categories found",
            data: categories,
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
    getPosts,
    getPost,
    createPost,
    getCategories,
};
