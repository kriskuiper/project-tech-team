const Bar = require("../models/Bar");

async function renderBars(req, res) {
    const bars = await Bar.find();

    res.status(400).render("bars", { bars: bars });
}

module.exports = renderBars;