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

    pushVariables()

    function pushVariables() {

      req.session.user.age = req.body.age;
      req.session.user.gender = req.body.gender;
      req.session.user.prefered_age.min = req.body.age_min;
      req.session.user.prefered_age.max = req.body.age_max;
      req.session.user.prefered_gender = req.body.prefered_gender;

      console.log(req.session.user);
    }

    updateUser()

    function updateUser() {
      User.find({
        'username': req.session.user.username
      }).exec(function(err, user) {
        if (err) return handleError(err);
        console.log(user.length);

        if (user.length > 0) {
          user.update({}, {
            $set: {
              age: req.body.age,
              gender: req.body.gender,
              prefered_age: {
                min: req.body.age_min,
                max: req.body.age_max
              },
              prefered_gender: req.body.prefered_gender
            }, {upsert: true}
          })
        }
      })
    }

    res.redirect("/");

  } catch (error) {
    next(error);
  }
}

module.exports = setPassword;
