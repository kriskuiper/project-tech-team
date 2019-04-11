const _array = require("lodash/array");
const fetch = require("node-fetch");
//Require list
const User = require("../models/User");
//This wil be the list of the liked persons of the logged-in user.
//This function will add users to the loggedin array users
async function match(req, res, next) {
    //Gets the personid that will be added to the list
    try {
        const {personid} = req.query;
        //Get all info from database
        const users = await User.find();

        if (personid) {
            // TODO: add real data instead of users[0]
            users[0].likedpersons.push(personid);
            users[0].save();
            //remove user from userpage
        }
        
        const extractIds = users.map(user => user.id);

        for (let i = 0; i < users[0].likedpersons.length; i++) {
            _array.pull(extractIds, users[0].likedpersons[i]);
        }

        //extractIds is list of users that aren't liked
        //console.log(extractIds);
        //console.log(users);

        const unlikedUsers = [];

        //images
        const imageWidth = 480;
        const imageHeight = 480;
        const collectionId = 181462;
        const peopleImages = [];

        for (let i = 0; i < extractIds.length; i++) {
            unlikedUsers.push(User.findById(extractIds[i], (err, res) => {
                if (err) {
                    next(err);
                } else {
                    return res;
                }
            }));
        }

        for (let i = 0; i < 430; i++) {
            const imageUrl = fetch (`https://source.unsplash.com/collection/${collectionId}/${imageWidth}x${imageHeight}`);
            peopleImages.push(imageUrl);
        }

        // When the for-loop is finished the system will show the matches
        const promisedUsers = await Promise.all(unlikedUsers);
        await Promise.all(peopleImages)
            .then(userImages => {
                console.log(userImages);
                res.status(200).render("users", {users: promisedUsers, peopleImages: userImages});
            });

    }
    catch(error) {
        next(error);
    }
}
module.exports = match;