function renderLogin(req, res,) {
    res.status(200).render("login", {error: false});
}

module.exports = renderLogin;