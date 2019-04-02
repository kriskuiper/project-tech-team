const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;
const Schema = mongoose.Schema;

const beerSchema = new Schema({
    _id: ObjectId,
    beerId: Number,
    name: String,
    img: String,
    description: String
});

module.exports = mongoose.model("Beer", beerSchema);