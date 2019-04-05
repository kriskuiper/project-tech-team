// require list
const User = require("../models/User");

// display the users from the database that are a match with the user
// items needed from database: User image, name, city, array of liked people

//This function will get the list of users that are matched with the logged in user
async function getMatches(req, res, next) {
    //gets all the users and their info from the database
    try{
    const users = await User.find();
    const {likedpersons} = req.body;
    const likes = [likedpersons];

    const likeUser = users.insertMany(likes, user => user.likedpersons === likedpersons);
    console.log(likeUser);

    res.status(200).render("users");
    // Saves the info about the user and sends it to matches.ejs
    }
    catch(error) {
        next(error);
    }
}
module.exports = getMatches;