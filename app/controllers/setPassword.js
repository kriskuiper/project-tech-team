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
        req.session.user.push({
          age: req.body.age,
          gender: req.body.gender,
          prefered_age: {
            min: req.body.age_min,
            max: req.body.age_max
          },
          prefered_gender: req.body.prefered_gender
        });
      }

      updateUser()

      function updateUser() {
        User.find({
          'username': req.session.user.username
        }).exec(function(err, user) {
            if (err) return handleError(err);

            if (user.length > 0) {
              user.updateMany({}, {
                  $set: {
                    age: req.body.age,
                    gender: req.body.gender,
                    prefered_age: {
                      min: req.body.age_min,
                      max: req.body.age_max
                    },
                    prefered_gender: req.body.prefered_gender
                  }
                })
              })
            }

            res.redirect("/");

          } catch (error) {
            next(error);
          }
        }

        module.exports = setPassword;
