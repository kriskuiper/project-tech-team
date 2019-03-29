const FeedPost = require("../models/FeedPost");
const getUsers = require("../models/apidata");
const serveNotLoggedIn = require("./serveNotLoggedIn");

async function renderFeed(req, res, next) {
    try {
        const posts = await FeedPost.find();
        const users = await getUsers();
        const reversed = posts.reverse();
        
        if (req.session.user) {
            res.status(200).render("feed", {
                posts: await reversed,
                users: await users,
                user: req.session.user
            });
        } else {
            serveNotLoggedIn(req, res);
        }
    } catch(error) {
        next(error);
    }
}

module.exports = renderFeed;