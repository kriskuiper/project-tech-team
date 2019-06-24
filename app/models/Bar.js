const mongoose = require("mongoose");
const {ObjectId, Schema} = mongoose;

const barSchema = new Schema({
    _id: ObjectId,
    barname: String,
    city: String,
    street: String,
    description: String
});

module.exports = mongoose.model("Bar", barSchema);
