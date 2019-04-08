const User = require("../models/User.js");

async function allFilter(req, res, next) {
  try {
    let { gender, min, max } = req.query;
    const users = await User.find();
    const filterAll = users.filter(user => user.age >= min && user.age <= max && user.gender === gender);


    res.render("users", { users: filterAll });

  } catch (error) {
    next(error);
  }
}

module.exports = allFilter;
