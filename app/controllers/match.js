const _array = require("lodash/array");

//Require list
const User = require("../models/User");
//This wil be the list of the liked persons of the logged-in user.
//This function will add users to the loggedin array users
async function match(req, res, next) {
    //Gets the personid that will be added to the list
    try {
        const {personid} = req.query;
        const users = await User.find();
        if (personid) {
            // TODO: add real data instead of users[0]
            users[0].likedpersons.push(personid);
            users[0].save();
            //remove user from userpage
        }

        const extractIds = users.map(user => user.id);

        for (let i = 0; i < users[0].likedpersons.length; i++) {
            _array.pull(extractIds, users[0].likedpersons[i]);
        }

        console.log(extractIds);
        //Saves the info about the user and sends it to matches.ejs
        res.status(200).render("users", {users: extractIds});
    }
    catch(error) {
        next(error);
    }
}
module.exports = match;