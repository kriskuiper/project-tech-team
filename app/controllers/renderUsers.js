const _array = require("lodash/array");
const fetch = require("node-fetch");
const User = require("../models/User");
const convertToObject = require("../helpers/convertToObject");

async function renderUsers(req, res, next) {
    const { personid, min, max, gender } = req.query;
    const notLikedUsers = [];
    const userImages = [];

    try {
        const loggedInUser = await User.findOne({
            "username": req.session.user.username
        });

        let { limit, page } = req.query;
        const [users, userCount] = await Promise.all([
            User.find()
                .limit(limit)
                .skip((page-1) * limit)
                .lean()
                .exec(),
            User.countDocuments()
        ]);

        let pageCount = Math.ceil(userCount / limit);
        if (pageCount === Infinity || pageCount === 1) {
            pageCount = 0;
        }

        const extractIds = users.map(user => user.id);

        if (personid) {
            loggedInUser.likedpersons.push(personid);
            loggedInUser.save();
        }
        
        for (let i = 0; i < loggedInUser.likedpersons.length; i++) {
            _array.pull(extractIds, loggedInUser.likedpersons[i]);
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
