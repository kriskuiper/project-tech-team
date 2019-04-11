const mongoose = require("mongoose");
const User = require("../models/User");

function createAccount(req, res, next) {
    const {username, password, firstname, lastname, age, gender, preferred_age, preferred_gender} = req.body;
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      password: password,
      firstName: firstname,
      lastName: lastname,
      profilePicture: null,
      beers: null,
      age: age,
      gender: gender,
      preferred_age: {
        min: preferred_age.min,
        max: preferred_age.max
      },
      preferred_gender: preferred_gender
    });

    setSession();

    User.create(newUser);

    function setSession(error) {
        if (error) {
            next(error);
        } else {
          const {username, password, firstname, lastname, age, gender, preferred_age, preferred_gender} = req.body;
            req.session.user = {
              username: username,
              password: password,
              firstName: firstname,
              lastName: lastname,
              profilePicture: null,
              beers: null,
              age: age,
              gender: gender,
              preferred_age: {
                min: preferred_age.min,
                max: preferred_age.max
              },
              preferred_gender: preferred_gender
            };
          res.redirect("/");
        }
    }
}

module.exports = createAccount;
