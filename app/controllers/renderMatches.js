//Require list
const User = require("../models/User");
const fetch = require("node-fetch");

const convertToObject = require("../helpers/convertToObject");

async function renderMatches(req, res, next) {
    const {currentPerson} = req.query;
    const peopleImages = [];
    const likedObjects = [];

    try {
        const users = await User.find();

        if (currentPerson) {
            const filteredLikedPersons = users[0].likedpersons.filter(likedperson => likedperson != currentPerson);
            users[0].likedpersons = filteredLikedPersons;
            users[0].save();
        }

        convertToObject(users[0].likedpersons, likedObjects);
        
        for (let i = 0; i < 430; i++) {
            const imageUrl = fetch ("https://source.unsplash.com/collection/181462/480x480");
            peopleImages.push(imageUrl);
        }

        const promisedUsers = await Promise.all(likedObjects);

        await Promise.all(peopleImages)
            .then(userImages => {
                res.status(200).render("matches", { matches: promisedUsers, peopleImages: userImages });
            });
    }
    catch(error) {
        next(error);
    }
}
module.exports = renderMatches;