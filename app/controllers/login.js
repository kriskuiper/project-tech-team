const User = require("../models/User");
const fetch = require("node-fetch");

async function login(req, res, next) {
  try {
    const {
      username,
      password
    } = req.body;
    await User.findOne({
      "username": username.toLowerCase()
    }, (err, data) => {
      if (err) console.log(err);

      if (data.password === password) {

        req.session.user = {
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          profilePicture: data.profilePicture,
          gender: data.gender,
          age: data.age,
          likedpersons: data.likedpersons,
          beers: data.beers
        };
        res.redirect("/users");
      } else {
        const error = "Username or password incorrect";
        res.status(403).render("login", {
          error: error
        });
      }
    })

  } catch (error) {
    next(error);
  }
}

module.exports = login;
