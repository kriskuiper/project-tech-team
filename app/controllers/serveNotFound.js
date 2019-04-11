const path = require("path");

function serveNotFound(req, res) {
    res.status(404).sendFile(path.join(__dirname, "../static/pages/404.html"));
}

module.exports = serveNotFound;