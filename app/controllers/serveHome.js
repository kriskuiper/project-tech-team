const path = require("path");

function serveHome(req, res) {
  console.log("HALKFHKHKAHEALHEK");
  if (!req.session.user) {
    res.status(200).sendFile(path.join(__dirname, "../static/index.html"));
  } else {
    const beerResults = "";
      res.status(200).render("home", {
        user: req.session.user,
        beerResults : beerResults
      });
    }
  }

module.exports = serveHome;
