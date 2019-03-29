const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;
const Schema = mongoose.Schema;

const reactionSchema = new Schema({
    _id: ObjectId,
    author: String,
    relatedpost: String,
    body: String
});

module.exports(mongoose.model("Reaction", reactionSchema));