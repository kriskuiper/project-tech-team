const User = require("../models/User");
const fetch = require("node-fetch");

async function login(req, res, next) {
<<<<<<< HEAD
  try {
    const {
      username,
      password
    } = req.body;

    await User.findOne({
      'username': username.toLowerCase()
    }, function(err, data) {
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
=======
    try {
        const users = await User.find();
        const {username, password} = req.body;

        // Source for this loop: Kaan Cenik
        for (let i = 0; i < users.length; i++) {
            if (username.toLowerCase() === users[i].username && password === users[i].password) {
                req.session.user = {
                    firstName: users[i].firstName,
                    lastName: users[i].lastName,
                    bike: users[i].bike
                };
                res.redirect("/my-feed");
            } else {
                const error = "Username or password incorrect";
                res.status(403).render("login", {error: error});
            }
        }
    } catch(error) {
        next(error);
    }
>>>>>>> development
}

module.exports = login;
