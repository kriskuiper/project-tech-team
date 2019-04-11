//Require list
const User = require("../models/User");
const fetch = require("node-fetch");

//Display the users from the database that are a match with the user
//This function will get the list of users that are matched with the logged in 

async function renderLikedPersons(req, res, next) {
    const {currentPerson} = req.query;

    //Gets all the users and their info from the database
    try{
        //images
        const imageWidth = 480;
        const imageHeight = 480;
        const collectionId = 181462;
        const peopleImages = [];

        const users = await User.find();
        const likedObjects = [];
        if (currentPerson) {
            const filteredLikedPersons = users[0].likedpersons.filter(likedperson => likedperson != currentPerson);
        users[0].likedpersons = filteredLikedPersons;
        users[0].save();
        }

        for (let i = 0; i < users[0].likedpersons.length; i++) {
            likedObjects.push(User.findById(users[0].likedpersons[i], (err, res) => {
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


        const promisedUsers = await Promise.all(likedObjects);
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
module.exports = renderLikedPersons;