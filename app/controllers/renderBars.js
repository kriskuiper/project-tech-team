const fetch = require("node-fetch");
require("dotenv").config();

let {
    MongoClient
} = require("mongodb");
let url = process.env.MONGODB_URI;



let barLocations = [];
const barImages = [];
const googleApiKey = process.env.GOOGLE_API_KEY;

async function renderBars(req, res) {
    //Get location of the user, to search nearby bars with google places api.
    const {
        location
    } = req.cookies;
    const geoLocationArr = location.split("-");
    const [lat, long] = geoLocationArr;

    searchBars(lat, long);

    //Fetch images from unsplash using provided specifications.
    for (let i = 0; i < 20; i++) {
        const imgUrl = fetch("https://source.unsplash.com/collection/884739/480x480/");
        barImages.push(imgUrl);
    }

    await Promise.all(barImages)
        .then(images => {
            res.status(200).render("bars", {
                barLocations: barLocations,
                barImages: images
            });
        });
}

async function searchBars() {
        MongoClient.connect(url, (err, db) => {
            if (err) throw err;
            let dbo = db.db("project-team");

            dbo.collection("bars").find({}).toArray((err, bar) => {
                if (err) throw err;
                barLocations = [];
                for (let i = 0; i < bar.length; i++) {
                    barLocations.push({
                        "name": bar[i].barname,
                        "street": bar[i].street,
                        "vicinity": bar[i].city,
                        "description": bar[i].description
                    });

                }

                db.close();
            });
        });
    
}

module.exports = renderBars;