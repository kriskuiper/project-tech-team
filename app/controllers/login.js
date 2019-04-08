const User = require("../models/User");

async function login(req, res, next) {
    try {
        const users = await User.find();
        const {username, password} = req.body;

        if (username.toLowerCase() === users.username && password === users.password) {
            req.session.user = {
                firstName: users.firstName,
                lastName: users.lastName,
                gender: users.gender,
                age: users.age,
                likedpersons: users.likedpersons,
                beers: users.beers
            };
            res.redirect("/");
        } else {
            const error = "Username or password incorrect";
            res.status(403).render("login", {error: error});
        }
    } catch(error) {
        next(error);
    }
}

module.exports = login;
