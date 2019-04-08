const {https} = require("follow-redirects");
const fetch = require("node-fetch");
require("dotenv").config();

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

//Place retrieved data in an array.
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

//Render image from unsplash
const imageWidth = 480; 
const imageHeight = 480; 
const collectionID = 884739;

async function renderGalleryItem() {
    const imgUrl = await fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/`);
    return imgUrl.url;
  }



function renderBarLocation(req, res) {
    res.status(200).render("barLocation", { barLocations: barLocations, barImg: renderGalleryItem});
}

placeSearch(latitude, longitude, radius);
renderGalleryItem();

module.exports = renderBarLocation;
