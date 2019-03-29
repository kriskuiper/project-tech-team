function logout(req, res, next) {
    req.session.destroy(redirectToHome);

    function redirectToHome(error) {
        if (error) {
            next(error);
        } else {
            res.redirect("/");
        }
    }
}

module.exports = logout;