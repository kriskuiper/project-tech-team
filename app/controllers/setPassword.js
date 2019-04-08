const mongoose = require("mongoose");
const User = require("../models/User");

async function setPassword(req, res, next) {
    try {
        const password = req.body;
        await User.update({'username': req.session.user.username}, { 'password': password });
        res.redirect("/");

    } catch(error) {
        next(error);
    }
}

module.exports = setPassword;
