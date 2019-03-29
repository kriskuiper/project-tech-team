const serveNotLoggedIn = require("./serveNotLoggedIn");

function renderForm(req, res) {
    if (req.session.user) {
        res.status(200).render("add-post.ejs");
    } else {
        serveNotLoggedIn(req, res);
    }
}

module.exports = renderForm;