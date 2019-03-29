const path = require("path");

function serveNotFound(req, res) {
    res.status(404).sendFile(path.join(__dirname, "../static/404.html"));
}

module.exports = serveNotFound;