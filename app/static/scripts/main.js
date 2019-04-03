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

document.getElementById("untappdConnect").addEventListener("click", untappdConnect);

function untappdConnect() {
  let CLIENTID = 'A0D5D7F766E859E3EF145BD051A3A576D2EA97CF'
  let REDIRECT_URL = 'https://untappdtest.herokuapp.com/untappd-authentication'

  window.location.href = 'https://untappd.com/oauth/authenticate/?client_id=' + CLIENTID + '&response_type=code&redirect_url=' + REDIRECT_URL;
}
