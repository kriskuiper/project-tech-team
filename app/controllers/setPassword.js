const mongoose = require("mongoose");
const User = require("../models/User");

async function setPassword(req, res, next) {
    try {
        console.log(req.session.user.username);

        await User.updateOne({'username': req.session.user.username}, { 'password': req.body.password });

        res.redirect("/");

    } catch(error) {
        next(error);
    }
}

module.exports = setPassword;
