const mongoose = require("mongoose");
const User = require("../models/User");

async function setPassword(req, res, next) {
  try {

    await User.updateMany({
      'username': req.session.user.username
    }, {
      'password': req.body.password,
      'age': req.body.age,
      'gender': req.body.gender,
      'preferred_age': {
        min: req.body.age_min,
        max: req.body.age_max
      },
      'preferred_gender': req.body.preferred_gender
    });

    pushVariables()

    function pushVariables() {

      req.session.user.age = req.body.age;
      req.session.user.gender = req.body.gender;
      req.session.user.preferred_age.min = req.body.age_min;
      req.session.user.preferred_age.max = req.body.age_max;
      req.session.user.preferred_gender = req.body.preferred_gender;
    }

    res.redirect("/");

  } catch (error) {
    next(error);
  }
}

module.exports = setPassword;
