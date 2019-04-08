const mongoose = require("mongoose");
const User = require("../models/User");

function createAccount(req, res, next) {
    const {username, password, firstname, lastname} = req.body;
    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        username: username.toLowerCase(),
        password: password,
        firstName: firstname,
        lastName: lastname,
        posts: [],
        reactions: []
    });

    setSession();

    User.create(newUser);

    function setSession(error) {
        if (error) {
            next(error);
        } else {
            req.session.user = {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
            };
            res.redirect("/my-feed");
        }
    }
}

module.exports = createAccount;
