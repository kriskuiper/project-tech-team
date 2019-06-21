
require("dotenv").config();

let {
    MongoClient
} = require("mongodb");
let url = process.env.MONGODB_URI;



let barLocations = [];



async function searchBars(req, res) {
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
                        "description": bar[i].description,
                        "imgUrl": bar[i].image
                    });
console.log(barLocations[i].imgUrl);

                }

                db.close();
            });
        });    
        res.status(200).render("bars", {
            barLocations: barLocations,
        });
}

module.exports = searchBars;