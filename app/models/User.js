const mongoose = require("mongoose");
const {ObjectId, Schema} = mongoose;

const userSchema = new Schema({
    _id: ObjectId,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    location: String,
    gender: String,
    age: Number,
    likedpersons: Array,
    beers: Object
});

module.exports = mongoose.model("User", userSchema);
