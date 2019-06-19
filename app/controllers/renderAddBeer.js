function renderAddBeer(req, res,) {
    res.status(200).render("add-beer", {error: false});
}

module.exports = renderAddBeer;
