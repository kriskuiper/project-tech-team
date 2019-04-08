// require list
const User = require("../models/User");

// display the users from the database that are a match with the user
// items needed from database: User image, name, city, array of liked people

//This function will get the list of users that are matched with the logged in user
async function renderLikedPersons(req, res, next) {
    const {currentPerson} = req.query;

    //gets all the users and their info from the database
    try{
        //gets the liked users from the database
        const users = await User.find();
        const likeIds = users[0].likedpersons;
        users[0].likedpersons = likeIds.filter(id => id != currentPerson);
        users[0].save();
        const likedPersons = [];
 
        //Gets every user id 
        for (let i = 0; i < likeIds.length; i++) {

            likedPersons.push(User.findById(likeIds[i], (err, res) => {
                if (err) {
                    next(err);
                } else {
                    return res;
                }
            }));
        }
        // When the for-loop is finished this will start
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
