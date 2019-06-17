//Require list
const User = require("../models/User");
const fetch = require("node-fetch");
const paginate = require("express-paginate");

const convertToObject = require("../helpers/convertToObject");

async function renderMatches(req, res, next) {
    const {currentPerson, page, limit} = req.query;
    const loggedInUser = await User.findOne({
        "username": req.session.user.username
    });
    const peopleImages = [];
    const likedObjects = [];

    try {
        if (currentPerson) {
            const filteredLikedPersons = loggedInUser.likedpersons.filter(likedperson => likedperson != currentPerson);
            loggedInUser.likedpersons = filteredLikedPersons;
            loggedInUser.save();
        }

        convertToObject(loggedInUser.likedpersons, likedObjects);
        
        for (let i = 0; i < 430; i++) {
            const imageUrl = fetch ("https://source.unsplash.com/collection/181462/480x480");
            peopleImages.push(imageUrl);
        }

        const promisedUsers = await Promise.all(likedObjects);
        const userCount = promisedUsers.length;
        let pageCount = Math.ceil(userCount / limit);
        if (pageCount === Infinity || pageCount === 1) pageCount = 0;

        await Promise.all(peopleImages)
            .then(userImages => {
                res.status(200).render("matches", { 
                    matches: promisedUsers, 
                    userImages: userImages,
                    pages: paginate.getArrayPages(req)(4, pageCount, page),
                    pageCount: pageCount
                });
            });
    }
    catch(error) {
        next(error);
    }
}
module.exports = renderMatches;