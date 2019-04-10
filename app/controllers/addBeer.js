const User = require("../models/User");
const fetch = require("node-fetch");

async function addBeer(req, res, next) {
  try {
    const beersArray = req.session.user.beers

    const beer_bid = req.body.beerBid;
    const beer_name = req.body.beerName;
    const beer_label = req.body.beerImg;
    const beer_description = req.body.beerDescription;
    const beer_brewery = req.body.brewery;

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

    res.redirect("/home");

  } catch (error) {
    next(error);
  }
}

module.exports = addBeer;
