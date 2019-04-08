//Require list
const User = require("../models/User");

//Display the users from the database that can be matched with
async function showUser(req, res) {

    //Gets all the users and their info from the database
    const users = await User.find();
    res.status(200).render("users", {users: users});
}
module.exports = showUser;