const https = require("follow-redirects").https;

const placeDetails = function() {
    this.place = [];
};

const latitude = 52.361778;
const longitude = 4.907370;
const radius = 500;

function placeSearch(latitude, longitude, radius) {
    https.request(
        {
            host: "maps.googleapis.com",
            path: "/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=" + radius + "&type=bar&key=AIzaSyBDu1B08NDVs8DlY5nRQcJfVouuyyVcpNw",
            method: "GET"
        }
    );
}

placeSearch(latitude, longitude, radius);