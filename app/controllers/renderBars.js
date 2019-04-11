const fetch = require("node-fetch");
require("dotenv").config();

const barLocations = [];
const barImages = [];
const googleApiKey = process.env.GOOGLE_API_KEY;

async function renderBars(req, res) {
    //Get location of the user, to search nearby bars with google places api.
    const { location } = req.cookies;
    const geoLocationArr = location.split("-");
    const [ lat, long ] = geoLocationArr;

    searchBars(lat, long);

    //Fetch images from unsplash using provided specifications.
    for (let i = 0; i < 20; i++) {
        const imgUrl = fetch("https://source.unsplash.com/collection/884739/480x480/");
        barImages.push(imgUrl);
    }

    await Promise.all(barImages)
        .then(images => {
            res.status(200).render("bars", { barLocations: barLocations, barImages: images});
        });
}

async function searchBars(latitude, longitude, radius = 500) {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=bar&key=${googleApiKey}`);
    const places = await response.json();
    return places;
}

module.exports = renderBars;
