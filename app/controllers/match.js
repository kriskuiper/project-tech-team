// require list
const User = require("../models/User");

// display the users from the database that are a match with the user
// items needed from database: User image, name, city, array of liked people

//This function will add users to the loggedin array users
async function match(req, res, next) {
    //gets the personid that will be added to the list
    try {
        const {personid} = req.query;
        const users = await User.find();
        if (personid) {
            // TODO: add real data instead of users[0]
            users[0].likedpersons.push(personid);
            users[0].save();
        }
        // Saves the info about the user and sends it to matches.ejs
        res.status(200).render("users", {users: users});
    }
    catch(error) {
        next(error);
    }
}
module.exports = match;