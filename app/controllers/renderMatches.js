//Require list
const User = require("../models/User");
const fetch = require("node-fetch");

const convertToObject = require("../helpers/convertToObject");

async function renderMatches(req, res, next) {
    const {currentPerson} = req.query;
    const peopleImages = [];
    const likedObjects = [];

    try {
      const loggedInUser = await User.findOne({
        "username": req.session.user.username
      });

      console.log(loggedInUser);

        if (currentPerson) {
            const filteredLikedPersons = loggedInUser.likedpersons.filter(likedperson => likedperson != currentPerson);
            loggedInUser.likedpersons = filteredLikedPersons;
            loggedInUser.save();
        }

        console.log(loggedInUser.likedpersons);

        convertToObject(loggedInUser.likedpersons, likedObjects);

        // for (let i = 0; i < 430; i++) {
        //     const imageUrl = fetch ("https://source.unsplash.com/collection/181462/480x480");
        //     peopleImages.push(imageUrl);
        // }

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
