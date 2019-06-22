const paginate = require("express-paginate");

const Bar = require("../models/Bar");

async function renderBars(req, res) {
    const jsEnabled = req.cookies.js_enabled;
    let { limit, page } = req.query;
    
    const [bars, barsCount] = await Promise.all([
        Bar.find()
            /* Limit is not a number from itself? ¯\_(ツ)_/¯ */
           .limit(Number(limit))
           .skip((page-1) * limit)
           .lean()
           .exec(),
        Bar.countDocuments()
    ]);

    let pageCount = Math.ceil(barsCount / limit);
    if (pageCount === Infinity || pageCount === 1) pageCount = 0;

    res.status(400).render("bars", { 
        bars: bars,
        pages: paginate.getArrayPages(req)(4, pageCount, page),
        pageCount: pageCount,
        paginate: paginate,
        jsEnabled: jsEnabled
    });
}

module.exports = renderBars;