const mongoose = require("mongoose");
const User = require("../models/User");

async function setPassword(req, res, next) {
    try {
        const password = req.body;
        console.log(req.session.user.username);
        // await User.update({'username': req.session.user.username}, { 'password': password });


        User.findOne({ 'username': req.session.user.username }, function (err, user) {
          if (err) {
            console.log("error");
          }
          user.password = password;
          user.save(callback);
        })

        res.redirect("/");

    } catch(error) {
        next(error);
    }
}

module.exports = setPassword;
