const mongoose = require("mongoose");
const User = require("../models/User");

async function setPassword(req, res, next) {
    try {
        const password = req.body;
        console.log(req.session.user.username);

        await User.updateOne({'username': req.session.user.username}, { 'password': '0000' });

        res.redirect("/");

    } catch(error) {
        next(error);
    }
}

module.exports = setPassword;
