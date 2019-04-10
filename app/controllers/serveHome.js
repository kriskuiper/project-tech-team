const path = require("path");
const fetch = require("node-fetch");

async function serveHome(req, res, user) {
    if (!req.session.user) {
        res.status(200).sendFile(path.join(__dirname, "../static/index.html"));
    } else {
        const beerValue = req.body;

        if (beerValue) {

          console.log(beerValue);
          const beerResults = await fetch('https://api.untappd.com/v4/search/beer?q=' + beerValue
                                    + '&client_id=' + process.env.CLIENTID
                                    + '&client_secret=' + process.env.CLIENTSECRET
                              );
          const beerObjects = await beerResults.json();
          console.log(beerObjects);
        }

        beerResults = '';

        res.status(200).render("home", {user: req.session.user, beerResults: beerResults});
    }
}

module.exports = serveHome;
