function renderSetPassword(req, res) {
    res.status(200).render("set-password", {user: req.session.user});
}

module.exports = renderSetPassword;
