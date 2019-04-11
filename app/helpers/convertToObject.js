const User = require("../models/User");

function convertToObject(arr, arrToPush) {
    for (let i = 0; i < arr.length; i++) {
        arrToPush.push(User.findById(arr[i], (err, res) => {
            if (err) {
                next(err);
            } else {
                return res;
            }
        }));
    }
}

module.exports = convertToObject;