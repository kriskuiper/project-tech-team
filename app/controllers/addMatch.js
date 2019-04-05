// require list
const User = require("../models/User");

// display the users from the database that are a match with the user
// items needed from database: User image, name, city, array of liked people

//This function will get the list of users that are matched with the logged in user
async function getMatches(req, res, next) {
    
    //Gets the list of the liked users
    const users = await User.find();
    const likeIds = users[0].likedpersons;
    const {currentPerson} = req.query;
    for (let i = 0; i < likeIds.length; i++) {

        if (likeIds[i] === currentPerson) {
            likeIds.delete(likeIds[i]);
            users[0].save();
        }
    }
            // await User.findById(likeIds[i], (err, res) => {
            //     //if the user is already liked by this user
            //     if (User.findById(likeIds[i] == likeUser)) {
            //         console.log("You've already liked this user");
            //         return;
            //     } else {
            //         console.log("You've liked this user!");
            //         try {
            //             const {personid} = req.query;
            //             if (personid) {
            //                 // TODO: add real data instead of users[0]
            //                 users[0].likedpersons.push(personid);
            //                 users[0].save();
            //             }
            //             // Saves the info about the user and sends it to matches.ejs
            //             res.status(200).render("users", {users: users});
            //         }
            //         catch(error) {
            //             next(error);
            //         }
            //     }
            // });
}
module.exports = getMatches;



    //gets the personid that will be added to the list
    