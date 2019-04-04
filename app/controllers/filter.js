const User = require("../models/User.js");

async function filter(req, res, next) {
  try {
    const users = await User.find();
    const { gender } = req.body;
    const filteredUsers = await users.filter(user => user.gender === gender);

    res.status(200).render("users");
  } catch(error) {
    next(error);
  }
}

module.exports = filter;
