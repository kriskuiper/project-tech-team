// require list
const User = require("../models/User");

// display the users from the database that are a match with the user
// items needed from database: User image, name, city, array of liked people

//This function will get the list of users that are matched with the logged in user
async function match(req, res, next) {
    //gets all the users and their info from the database
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