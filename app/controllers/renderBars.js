const paginate = require("express-paginate");

const Bar = require("../models/Bar");

async function renderBars(req, res) {
    const jsEnabled = req.cookies.js_enabled;

    res.status(400).render("bars", { bars: bars });
}

module.exports = renderBars;