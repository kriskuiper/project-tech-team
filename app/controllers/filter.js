const User = require("../models/User.js");

async function filter(req, res, next) {
  try {
    const users = await User.find();
    const { gender, min, max } = req.query;

    const filteredUsers = [];

    for (let user of users) {
      if (user.age >= min && user.age <= max && user.gender === gender) {
        filteredUsers.push(user);
      }
    }

    res.render("users", { users: filteredUsers });
  } catch (error) {
    next(error);
  }
}

module.exports = filter;
