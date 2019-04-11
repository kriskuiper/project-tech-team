const {https} = require("follow-redirects");
const fetch = require("node-fetch");
require("dotenv").config();

const barLocations = [];

//set search information (API key and radius) for google place search.
const googleApiKey = process.env.GOOGLE_API;
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

//set specifications for unsplash picture.
const imageWidth = 480; 
const imageHeight = 480; 
const collectionID = 884739;
let randomImage = Math.floor(Math.random() * 50);
const barImages = [];

async function renderBarLocation(req, res) {
    //Get location of the user, to search nearby bars with google places api.
    const { location } = req.cookies;
    const geoLocationArr = location.split("-");
    const [ lat, long ] = geoLocationArr;

    placeSearch(lat, long, radius);

    //Fetch images from unsplash using provided specifications.
    for (let i = 0; i < 20; i++) {
        const imgUrl = fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${randomImage}`);
        barImages.push(imgUrl);
    }

    await Promise.all(barImages)
        .then(images => {
            res.status(200).render("barLocation", { barLocations: barLocations, barImages: images});
        });
}

module.exports = renderBarLocation;