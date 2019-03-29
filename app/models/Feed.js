const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;
const Schema = mongoose.Schema;

const feedSchema = new Schema({
    _id: ObjectId,
    owner: String,
    posts: Array
});

module.exports(mongoose.model("Feed", feedSchema));