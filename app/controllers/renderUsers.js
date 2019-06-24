const _array = require("lodash/array");
const User = require("../models/User");
const matchUsersOnBeers = require("../helpers/matchUsersOnBeers");
const convertToObject = require("../helpers/convertToObject");

async function renderUsers(req, res, next) {
    let { personid, min, max, gender } = req.query;
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

        let beerArray = [];

        loggedInUser.beers.forEach(beer => {
            beerArray.push(beer.beer.name);
        });

        const promisedUsers = await Promise.all(notLikedUsers);

        const age = await function(value) {
            value = [];
            for (min; min <= max; min++) {
                value.push(min);
            }
            return value;
        };


        let filters = {};

        if(gender !== undefined) {
            filters.gender = [gender];
        }

        const ageRange = age();

        if (ageRange.length >= 2) {
            filters.age = ageRange;
        }

        const multiFilter = function(array, filters) {
            const filterKeys = Object.keys(filters);
            // filters all elements passing the criteria
            return array.filter(item => {
                // dynamically validate all filter criteria
                return filterKeys.every(key => {
                    // ignores an empty filter
                    if (!filters[key].length) {
                        return true;
                    }
                    return filters[key].includes(item[key]);
                });
            });
        };

        const filteredUsers = await multiFilter(promisedUsers, filters);

        const allFilter = await matchUsersOnBeers(filteredUsers, req.query);

        !req.query.heineken
            ? res.status(200).render("users", {
                users: filteredUsers,
                jsEnabled: jsEnabled,
                beerArray: beerArray,
                user: req.session.user
            })
            : res.status(200).render("users", {
                users: allFilter,
                jsEnabled: jsEnabled,
                beerArray: beerArray,
                user: req.session.user
            });
    }
    catch(error) {
        next(error);
    }
}
module.exports = renderUsers;
