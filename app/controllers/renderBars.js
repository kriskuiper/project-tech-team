require("dotenv").config();
const Bar = require("../models/bars");

let {
    MongoClient
} = require("mongodb"),
    url = process.env.MONGODB_URI,
    barLocations = [];

const mongoose = require("mongoose");
let db = mongoose.connection;


async function searchBars(req, res) {
    mongoose.connect(url);

    db.on("error", console.error.bind(console, "Connection error: "));
    db.once("open", (callback) => {
        //The code in this asynchronous callback block is executed after connecting to MongoDB. 
        console.log("Successfully connected to MongoDB.");
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
        console.log(barLocations);
        
    });
    res.status(200).render("bars", {
        barLocations: barLocations,
    });
}

module.exports = searchBars;