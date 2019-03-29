const find = require("array-find");
const FeedPost = require("../models/FeedPost");

async function renderPostDetail(req, res, next) {
    let url = req.params.url;
    let posts = await FeedPost.find();
    let post = find(posts, getClickedPost);

    if (!post) {
        next();
        return;
    }

    function getClickedPost(post) {
        return post.url === url;
    }

    res.status(200).render("detail-page", {post: post});
}

module.exports = renderPostDetail;