const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: ObjectId,
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    bike: String,
    posts: Array,
    reactions: Array
});

module.exports = mongoose.model("User", userSchema);