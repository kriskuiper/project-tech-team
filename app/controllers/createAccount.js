const mongoose = require("mongoose");
const User = require("../models/User");

function createAccount(req, res, next) {
    const {username, password, firstname, lastname, age, gender} = req.body;
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      username: username,
      password: password,
      firstName: firstname,
      lastName: lastname,
      profilePicture: null,
      beers: null,
      age: age,
      gender: gender
    });

    setSession();

    User.create(newUser);

    function setSession(error) {
        if (error) {
            next(error);
        } else {
          const {username, password, firstname, lastname, age, gender} = req.body;
            req.session.user = {
              username: username,
              password: password,
              firstName: firstname,
              lastName: lastname,
              profilePicture: null,
              beers: null,
              age: age,
              gender: gender
            };
          res.redirect("/");
        }
    }
}

module.exports = createAccount;
