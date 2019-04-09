const mongoose = require("mongoose");
const User = require("../models/User");

async function setPassword(req, res, next) {
    try {

        await User.updateMany({'username': req.session.user.username}, { 'password': req.body.password, 'age': req.body.age, 'gender': req.body.gender });

        res.redirect("/");

    } catch(error) {
        next(error);
    }
}

module.exports = setPassword;
