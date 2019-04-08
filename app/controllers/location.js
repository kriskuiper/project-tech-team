const {https} = require("follow-redirects");
require("dotenv").config();

const placeDetails = function() {
    this.places = [];
};

const barLocations = [];

//Declare loction information
const googleApiKey = process.env.GOOGLE_API;
const latitude = 52.361778;
const longitude = 4.907370;
const radius = 500;


//Find places within the specified radius, based on the coordinates provided.
function placeSearch(latitude, longitude, radius) {
    https.request({
        host: "maps.googleapis.com",
        path: `/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=bar&key=${googleApiKey}`,
        method: "GET"
    },
        PlaceResult).end();
}

//Place retrieved data in an array, and display data in terminal (for now)
function PlaceResult(response) { 
    let data = "";
    let sdata = "";

    response.on("data", chunk => {
        data += chunk;
    });
    response.on("end", () => {
        sdata = JSON.parse(data);
        if (sdata.status === "OK") {
            for (let i = 0; i < sdata.results.length; i++) {
                barLocations.push(sdata.results[i]);
            }
        } 
    });
}

function renderBarLocation(req, res) {
    res.status(200).render("barLocation", { barLocations: barLocations });
}

placeSearch(latitude, longitude, radius);
renderBarLocation();
module.exports = PlaceResult;
