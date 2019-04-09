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
  let CLIENTID = 'A0D5D7F766E859E3EF145BD051A3A576D2EA97CF'
  let CLIENTSECRET = 'EBF811599C0F5914F7F37349041336C86926AC40'

  fetch('https://api.untappd.com/v4/search/beer?q=' + document.getElementById("searchName").value + '&client_id=' + CLIENTID + '&client_secret=' + CLIENTSECRET, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(function(data) {
      let Beers = data.response.beers.items
      document.getElementById("beer__search").classList.add("active");
      for (let i = 0; i < Beers.length; i++) {
        const listElement = document.getElementById('beer_results');
        listElement.querySelectorAll(':scope > *')
        listElement.createElement("li");
        listElement.innerHTML +=

          '<form action="/add-beer" method="post"><img src="' + Beers[i].beer.beer_label + '"><input class="beer__name invisible" name="beerImg" value="' + Beers[i].beer.beer_label + '"><input class="beer__bid invisible" name="beerBid" value="' + Beers[i].beer.bid + '"><input class="beer__name invisible" name="beerName" value="' + Beers[i].beer.beer_name + '"><h3>' + Beers[i].beer.beer_name + '</h3><input class="beer__description invisible" name="beerDescription" value="' + Beers[i].beer.beer_description + '"><p>' + Beers[i].beer.beer_description + '</p><input class="brewery_name invisible" name="brewery" value="' + Beers[i].brewery.brewery_name + '"><p>' + Beers[i].brewery.brewery_name + '</p><button type="submit" name="button">Add</button></form>'

      }
    })
    .catch(error => console.error('Error:', error))
  event.preventDefault()
}
