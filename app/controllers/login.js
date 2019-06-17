const User = require("../models/User");
require("dotenv").config();

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
        const authLink = "https://untappd.com/oauth/authenticate/?client_id=" + process.env.CLIENTID + "&response_type=code&redirect_url=" + process.env.REDIRECT_URL;
        res.status(403).render("login", {
          error: error,
          authLink: authLink
        });
      }
    });

  } catch (error) {
    next(error);
  }
}

module.exports = login;
