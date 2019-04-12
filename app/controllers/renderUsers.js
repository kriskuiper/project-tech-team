const _array  = require("lodash/array");
const _includes = require('lodash/includes');
const fetch = require("node-fetch");

const User = require("../models/User");
const convertToObject = require("../helpers/convertToObject");

async function renderUsers(req, res, next) {
    // const { likedpersons } = loggedInPerson;

    try {
      const { personid, min, max, gender } = req.query;
      const notLikedUsers = [];
      const userImages = [];
      const users = await User.find();
      const loggedInUser = await User.findOne({
        "username": req.session.user.username
      });
      const extractIds = users.map(user => user.id);
      console.log(_includes(loggedInUser.likedpersons, personid) == false);

        if ((personid) && (_includes(loggedInUser.likedpersons, personid) == false)) {
            loggedInUser.likedpersons.push(personid);
            console.log(personid);
            loggedInUser.save();
        }

        for (let i = 0; i < loggedInUser.likedpersons.length; i++) {
            _array.pull(extractIds, loggedInUser.likedpersons[i]);
        }

        convertToObject(extractIds, notLikedUsers);

        // for (let i = 0; i < 430; i++) {
        //     const imageUrl = fetch ("https://source.unsplash.com/collection/181462/480x480");
        //     userImages.push(imageUrl);
        // }

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
