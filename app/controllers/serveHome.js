const path = require("path");

function serveHome(req, res, user) {
    if (!req.session.user) {
        res.status(200).sendFile(path.join(__dirname, "../static/index.html"));
    } else {
        res.status(200).render("feed", user: req.session.user);
    }
}

module.exports = serveHome;
