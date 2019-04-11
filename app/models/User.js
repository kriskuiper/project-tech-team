const mongoose = require("mongoose");
const {ObjectId, Schema} = mongoose;

const userSchema = new Schema({
<<<<<<< HEAD
  _id: ObjectId,
  username: String,
  password: String,
  profilePicture: String,
  firstName: String,
  lastName: String,
  gender: String,
  likedpersons: Array,
  beers: Object,
  age: Number,
  preferred_age: Object,
  preferred_gender: String,
=======
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
>>>>>>> development
});

module.exports = mongoose.model("User", userSchema);
