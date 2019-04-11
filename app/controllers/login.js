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
      if (err) return handleError(err);

      if (data.password === password) {

        req.session.user = {
          firstName: data.firstName,
          lastName: data.lastName,
          profilePicture: data.profilePicture,
          gender: data.gender,
          age: data.age,
          likedpersons: data.likedpersons,
          beers: data.beers
        };
        res.render("home", {
          user: req.session.user,
          fetch: fetch
        });
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
