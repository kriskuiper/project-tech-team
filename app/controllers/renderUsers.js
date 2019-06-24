const _array = require("lodash/array");
const User = require("../models/User");
const convertToObject = require("../helpers/convertToObject");

async function renderUsers(req, res, next) {
    const { personid, min, max, gender } = req.query;
    const notLikedUsers = [];
    const jsEnabled = req.cookies.js_enabled;

    try {
        const loggedInUser = await User.findOne({
            "username": req.session.user.username
        });
        const users = await User.find();
        const extractIds = users.map(user => user.id);

        if (personid) {
            loggedInUser.likedpersons.push(personid);
            loggedInUser.save();
        }

        for (let i = 0; i < loggedInUser.likedpersons.length; i++) {
            _array.pull(extractIds, loggedInUser.likedpersons[i]);
        }

        convertToObject(extractIds, notLikedUsers);

        const promisedUsers = await Promise.all(notLikedUsers);
        const filteredUsers = promisedUsers.filter(user => user.age >= min && user.age <= max && user.gender === gender);

        if (!min && !max && !gender) {
            res.status(200).render("users", {
                users: promisedUsers,
                user: loggedInUser,
                jsEnabled: jsEnabled
            });
        } else {
            res.status(200).render("users", {
                users: filteredUsers,
                user: loggedInUser,
                jsEnabled: jsEnabled
            });
        }

    }
    catch(error) {
        next(error);
    }
}
module.exports = renderUsers;
