const path = require("path");

function serveHome(req, res) {
  if (!req.session.user) {
    res.status(200).sendFile(path.join(__dirname, "../static/pages/index.html"));
  } else {
    const beerResults = req.session.user.beers;
      res.status(200).render("home", {
        user: req.session.user,
        beerResults : beerResults
      });
    }
  }

module.exports = serveHome;
