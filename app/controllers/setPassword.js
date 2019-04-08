const mongoose = require("mongoose");
const User = require("../models/User");

async function setPassword(req, res, next) {
    try {
        const {username, password} = req.body;
        await User.updateOne({'username': username}, { 'password': password });
        res.redirect("/");

    } catch(error) {
        next(error);
    }
}

module.exports = setPassword;
