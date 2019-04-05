// require list
const User = require("../models/User");

// display the users from the database that are a match with the user
// items needed from database: User image, name, city, array of liked people

//This function will get the list of users that are matched with the logged in user
async function match(req, res, next) {
    //gets all the users and their info from the database
    try{
    const users = await User.find();

    const updateLikedPersons = (error, doc) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Before: " + doc.likedpersons);
            doc.likedPersons.push("7872897348739872");
            doc.save();
            console.log("After: " + doc.likedpersons);
        }
    };
    
    User.findById(users[0]._id, updateLikedPersons);

    // Saves the info about the user and sends it to matches.ejs
    res.status(200).render("users");
    }
    catch(error) {
        next(error);
    }
}
module.exports = match;