const User = require("../models/User");
const fetch = require("node-fetch");

async function setPassword(req, res, next) {
  try {
      const beersArray = req.session.user.beers

      let beer_bid = req.body.bid;
      let beer_name = req.body.beerName;
      let beer_label = req.body.label;
      let beer_description = req.body.description;
      let beer_brewery = req.body.brewery;

      objectBeer = {
        beer: {
          bid: beer_bid,
          name: beer_name,
          img: beer_label,
          description: beer_description,
          brewery: beer_brewery
        }
      };

      beersArray.push(objectBeer);

    await User.updateMany({
      'username': req.session.user.username
    }, {
      'beers': beersArray
    });

    pushVariables()

    function pushVariables() {

      req.session.user.beers = beersArray;
    }

    res.redirect("/");

  } catch (error) {
    next(error);
  }
}

module.exports = login;
