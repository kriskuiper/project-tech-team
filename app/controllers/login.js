const User = require("../models/User");

async function login(req, res, next) {
    try {
        const users = await User.find();
        const {username, password} = req.body;

        if (username.toLowerCase() === users[i].username && password === users[i].password) {
            req.session.user = {
                firstName: users[i].firstName,
                lastName: users[i].lastName
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
