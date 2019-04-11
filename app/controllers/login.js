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
          username: data.username,
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
          beerResults: ""
        });
      } else {
        const error = "Username or password incorrect";
        const authLink = 'https://untappd.com/oauth/authenticate/?client_id=' + process.env.CLIENTID + '&response_type=code&redirect_url=' + process.env.REDIRECT_URL;
        res.status(403).render("login", {
          error: error,
          authLink: authLink
        });
      }
    })

  } catch (error) {
    next(error);
  }
}

module.exports = login;
