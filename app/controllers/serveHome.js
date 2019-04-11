const path = require("path");

function serveHome(req, res) {
  if (!req.session.user) {
    console.log("No user specified");
    res.status(200).sendFile(path.join(__dirname, "../static/index.html"));
  } else {
    console.log("We've got a user");
    const beerResults = "";
      res.status(200).render("home", {
        user: req.session.user,
        beerResults : beerResults
      });
    }
  }

module.exports = serveHome;
