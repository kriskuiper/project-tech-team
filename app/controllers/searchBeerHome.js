const User = require("../models/User");
const fetch = require("node-fetch");
require("dotenv").config();

async function searchBeerHome(req, res, next) {
  try {

    const beerValue = req.body.beerName;
    console.log(req.body.beerName + " is search value");

    if (beerValue) {

      const beerResults = await fetch('https://api.untappd.com/v4/search/beer?q=' + beerValue +
        '&client_id=' + process.env.CLIENTID +
        '&client_secret=' + process.env.CLIENTSECRET
      );
      const beerObjects = await beerResults.json();
      const beerList = beerObjects.response.beers.items;

      console.log(beerObjects.response.beers.items);

    res.status(200).render("home", {
      user: req.session.user,
      beerResults: beerList
    });
}
  } catch (error) {
    next(error);
  }
}

module.exports = searchBeerHome;
