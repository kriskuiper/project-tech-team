function renderSetPassword(req, res) {
    const jsEnabled = req.cookies.js_enabled;

    res.status(200).render("set-password", {
        user: req.session.user,
        jsEnabled: jsEnabled
    });
}

module.exports = renderSetPassword;
