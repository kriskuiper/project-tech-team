const User = require("../models/User");
const convertToObject = require("../helpers/convertToObject");
const path = require("path");

async function serveHome(req, res, next) {
  const beerResults = "";

  if (!req.session.user) {
    res
      .status(200)
      .sendFile(path.join(__dirname, "../static/pages/index.html"));
  } else {
    try {
      const {currentPerson} = req.query;
      const loggedInUser = await User.findOne({
          "username": req.session.user.username
      });
      const likedObjects = [];
        if (currentPerson) {
            const filteredLikedPersons = loggedInUser.likedpersons.filter(likedperson => likedperson != currentPerson);
            loggedInUser.likedpersons = filteredLikedPersons;
            loggedInUser.save();
        }

        convertToObject(loggedInUser.likedpersons, likedObjects);

        const promisedUsers = await Promise.all(likedObjects);

        res.status(200).render("home", { matches: promisedUsers, user: req.session.user, beerResults: beerResults});
    }
    catch(error) {
        next(error);
    }
  }
}

module.exports = serveHome;
