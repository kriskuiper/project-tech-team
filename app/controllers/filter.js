const User = require("../models/User.js");

async function filter(req, res, next) {
  try {
    const users = await User.find();
    const filteredUsers = users.filter(user => user.gender === user.input);
    console.log(filteredUsers);
} catch(error) {
    next(error);
  }
}
filter();

module.exports = filter;
