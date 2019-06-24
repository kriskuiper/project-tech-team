//Require list
const User = require("../models/User");

const convertToObject = require("../helpers/convertToObject");

async function renderMatches(req, res, next) {
    const {currentPerson} = req.query;
    const loggedInUser = await User.findOne({
        "username": req.session.user.username
    });
    const likedObjects = [];
    const jsEnabled = req.cookies.js_enabled;

    try {
        if (currentPerson) {
            const filteredLikedPersons = loggedInUser.likedpersons.filter(likedperson => likedperson != currentPerson);
            loggedInUser.likedpersons = filteredLikedPersons;
            loggedInUser.save();
        }

        convertToObject(loggedInUser.likedpersons, likedObjects);

        const promisedUsers = await Promise.all(likedObjects);

        res.status(200).render("matches", {
            matches: promisedUsers,
            user: loggedInUser,
            jsEnabled: jsEnabled
        });
    }
    catch(error) {
        next(error);
    }
}
module.exports = renderMatches;
