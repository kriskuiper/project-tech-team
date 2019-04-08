const {https} = require("follow-redirects");
require("dotenv").config();

const placeDetails = function() {
    this.places = [];
};

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
    const PD = new placeDetails();

    response.on("data", chunk => {
        data += chunk;
    });
    response.on("end", () => {
        sdata = JSON.parse(data);
        if (sdata.status === "OK") {
            console.log("Status: " + sdata.status);
            console.log("Results: " + sdata.results.length);
            for (let i = 0; i < sdata.results.length; i++) {
                PD.places.push(sdata.results[i]);
            }
            for (let i = 0; i < sdata.results.length; i++) {
                console.log("----------------------------------------------");
                console.log("Name: " + PD.places[i].name);
                console.log("adress: " + PD.places[i].vicinity);
            }
        } else {
            console.log(sdata.status);
        }
    });
}



//placeSearch(latitude, longitude, radius);
const sdata = "test";



function showBars(req, res) {
    res.status(200).render("barLocation", {barLocation:sdata});
}
module.exports = showBars;