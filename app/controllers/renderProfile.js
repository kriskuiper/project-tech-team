function renderProfile(req, res) {
    const beerResults = "";
    res.status(200).render("home", {
        user: req.session.user,
        beerResults: beerResults
    });
}

module.exports = renderProfile;
