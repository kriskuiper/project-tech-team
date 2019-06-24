function renderAddBeer(req, res) {
    const jsEnabled = req.cookies.js_enabled;
    res.status(200).render("add-beer", {
        error: false,
        jsEnabled: jsEnabled
    });
}

module.exports = renderAddBeer;
