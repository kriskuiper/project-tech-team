// require list
const User = require("../models/User");
const username = "Logged-in user";

// display the users from the database that are a match with the user
// items needed from database: User image, name, city, array of liked people

//This function will get the list of users that are matched with the logged in user
async function getMatches(req, res) {
    //gets all the users and their info from the database
    const users = await User.find();

    res.status(200).render("matches", {users: users});
    // Saves the info about the user and sends it to matches.ejs
}
module.exports = getMatches;