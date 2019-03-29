const path = require("path");

function serveHome(req, res) {
    if (!req.session.user) {
        res.status(200).sendFile(path.join(__dirname, "../static/index.html"));
    } else {
        res.status(200).redirect("/my-feed");
    }
}

module.exports = serveHome;