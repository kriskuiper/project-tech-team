// require list
const User = require("../models/User");

// display the users from the database that can be matched with
// items needed from database: User image, name, city

//This function will show every user
async function showUser(req, res) {

    //gets all the users and their info from the database
    const users = await User.find();
    res.status(200).render("matches", {users: users});
    // Saves the info about the user and sends it to matches.ejs
}
module.exports = showUser;