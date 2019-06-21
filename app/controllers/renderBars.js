require("dotenv").config();
const Bar = require("../models/bars");
const mongoose = require("mongoose");

let url = process.env.MONGODB_URI,
    barLocations = [],
    db = mongoose.connection;

async function searchBars(req, res) {
    mongoose.connect(url);

    // eslint-disable-next-line no-console
    db.on("error", console.error.bind(console, "Connection error: "));
    db.once("open", (callback) => {
    });

    let bar = mongoose.model("Bar", Bar.barSchema);

    bar.find({}, (_error, bars) => {
        barLocations = [];
        for (let i = 0; i < bars.length; i++) {
            barLocations.push({
                "name": bars[i].barname,
                "street": bars[i].street,
                "vicinity": bars[i].city,
                "description": bars[i].description,
                "imgUrl": bars[i].image
            });
        }
        
    });
    res.status(200).render("bars", {
        barLocations: barLocations,
    });
}

module.exports = searchBars;