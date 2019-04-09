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
      'prefered_age': {
        min: req.body.age_min,
        max: req.body.age_max
      },
      'prefered_gender': req.body.prefered_gender
    });

    updateUser()

    function updateUser() {

      User.findOneAndUpdate({
        'username': req.session.user.username
      }, {
          age: req.body.age
      },
      {upsert:true}, done)

      function done(err, data) {
      if (err) {
        next(err)
      } else {
        res.redirect('/');
      }
    }
    }

    pushVariables()

    function pushVariables() {

      req.session.user.age = req.body.age;
      req.session.user.gender = req.body.gender;
      req.session.user.prefered_age.min = req.body.age_min;
      req.session.user.prefered_age.max = req.body.age_max;
      req.session.user.prefered_gender = req.body.prefered_gender;

      console.log(req.session.user);
    }

    res.redirect("/");

  } catch (error) {
    next(error);
  }
}

module.exports = setPassword;
