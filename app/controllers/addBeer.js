const slug = require("slug");
const mongoose = require("mongoose");
const FeedPost = require("../models/FeedPost");


function addPost(req, res, next) {
    try {
        const url = slug(req.body.title).toLowerCase();
        const { firstName, lastName, bike } = req.session.user;
        const newFeedPost = new FeedPost({
            _id: new mongoose.Types.ObjectId(),
            url: url,
            title: req.body.title,
            author: `${firstName} ${lastName}`,
            contents: req.body.contents,
            kms: req.body.kms,
            bike: bike,
            location: req.body.location,
            pictures: []
        });
        
        FeedPost.create(newFeedPost);
        
        // When the form is posted, redirect to the users' feed
        res.redirect("/my-feed");
    } catch(error) {
        next(error);
    }
}

module.exports = addPost;