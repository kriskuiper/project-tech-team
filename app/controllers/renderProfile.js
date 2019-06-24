function renderProfile(req, res) {
    const beerResults = "";
    const jsEnabled = req.cookies.js_enabled;

    res.status(200).render("home", {
        user: req.session.user,
        beerResults: beerResults,
        jsEnabled: jsEnabled
    });
}

module.exports = renderProfile;
