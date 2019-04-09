const fetch = require("node-fetch");
require("dotenv").config();

// Cutting the mustard technique
if ("querySelector" in document) {
    document.body.classList.add("js-enabled");
}

// Handle feed posts
const feedPosts = document.querySelectorAll(".feed__post");
const postObserver = new IntersectionObserver(showPosts);

// Observe the feed posts
feedPosts.forEach(observeFeedPost);

function observeFeedPost(feedPost) {
  postObserver.observe(feedPost);
}

// Callback for the intersection observer, add the is--visible class to an entry if it is intersecting with the IU
function showPosts(entries) {
  entries.forEach(showPost);

  function showPost(entry) {
    const entryClass = entry.target.classList;

    if (entry.isIntersecting) {
      entryClass.add("is--visible");
    }
  }
}

function beerSearch(event) {

  fetch('https://api.untappd.com/v4/search/beer?q=' + document.getElementById("searchName").value + '&client_id=' + process.env.CLIENTID + '&client_secret=' + process.env.CLIENTSECRET , {
    method: 'GET'
    })
  .then(response => response.json())
  .then(function(data) {
    let Beers = data.response.beers.items
    document.getElementById("beer__search").classList.add("active");
    for (let i = 0; i < Beers.length; i++) {
      // console.log('<li onClick="addBeer(' + Beers[i].beer.bid + ')">' + Beers[i].beer.beer_name + '</li>');
      document.getElementById('beer_results').innerHTML +=

      '<form action="/add-beer" method="post"><img src="' + Beers[i].beer.beer_label + '"><input class="beer__name" name="beerImg" value="' + Beers[i].beer.beer_label + '"><input class="beer__bid" name="beerBid" value="' + Beers[i].beer.bid + '"><input class="beer__name" name="beerName" value="' + Beers[i].beer.beer_name + '"><h3>' + Beers[i].beer.beer_name + '</h3><button type="submit" name="button">Add</button></form>'

    }
  })
  .catch(error => console.error('Error:', error))
  event.preventDefault()
}
