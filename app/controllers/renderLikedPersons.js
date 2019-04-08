//Require list
const User = require("../models/User");

//Display the users from the database that are a match with the user
//This function will get the list of users that are matched with the logged in user
async function renderLikedPersons(req, res, next) {
    const {currentPerson} = req.query;

    //Gets all the users and their info from the database
    try{
        const users = await User.find();
        //if the user wants to unmatch a person
        const likeIds = users[0].likedpersons;
        //TODO: Add user session to users[0]
        users[0].likedpersons = likeIds.filter(id => id != currentPerson);
        users[0].save();
        const likedPersons = [];
 
        //Gets all the users from the database
        for (let i = 0; i < likeIds.length; i++) {
            likedPersons.push(User.findById(likeIds[i], (err, res) => {
                if (err) {
                    next(err);
                } else {
                    return res;
                }
            }));
        }

        // When the for-loop is finished the system will show the matches
        await Promise.all(likedPersons)
            .then(results => {
                res.status(200).render("matches", {likedpersons: results});
            });
        // Saves the info about the user and sends it to matches.ejs
    }
    catch(error) {
        next(error);
    }
}
module.exports = renderLikedPersons;