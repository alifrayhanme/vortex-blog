
async function uploadImage(req, res) {
    if (req.file.path) {
        return res.send({
            ok: true,
            message: "Image uploaded successfully",
            imageUrl: req.file.path,
        });
    }
    res.send({
        ok: false,
        message: "Something went wrong",
        error: "Unable to upload image to cloudinary",
        errorType: "Error",
    });
}

module.exports = {
    uploadImage,
};
