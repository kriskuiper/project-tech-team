const _array = require("lodash/array");
const fetch = require("node-fetch");

const User = require("../models/User");
const convertToObject = require("../helpers/convertToObject");

async function renderUsers(req, res, next) {
    // const { likedpersons } = loggedInPerson;
    const { personid, min, max, gender } = req.query;
    const notLikedUsers = [];
    const userImages = [];

    try {
        const users = await User.find();
        const extractIds = users.map(user => user.id);

        if (personid) {
            // TODO: add real data instead of users[0]
            users[0].likedpersons.push(personid);
            users[0].save();
        }

        for (let i = 0; i < users[0].likedpersons.length; i++) {
            _array.pull(extractIds, users[0].likedpersons[i]);
        }

        convertToObject(extractIds, notLikedUsers);

        for (let i = 0; i < 430; i++) {
            const imageUrl = fetch ("https://source.unsplash.com/collection/181462/480x480");
            userImages.push(imageUrl);
        }

        const promisedUsers = await Promise.all(notLikedUsers);
        const filteredUsers = promisedUsers.filter(user => user.age >= min && user.age <= max && user.gender === gender);

        await Promise.all(userImages)
            .then(userImages => {
                if (!min && !max && !gender) {
                    res.status(200).render("users", { users: promisedUsers, userImages: userImages });
                } else {
                    res.status(200).render("users", { users: filteredUsers, userImages: userImages });
                }
            });
    }
    catch(error) {
        next(error);
    }
}
module.exports = renderUsers; 
