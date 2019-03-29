const path = require("path");

function serveNotLoggedIn(req, res) {
    res.status(401).sendFile(path.join(__dirname, "../static/401.html"));
}

module.exports = serveNotLoggedIn;