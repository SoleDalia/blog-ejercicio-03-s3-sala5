const { User } = require("../../models");
const bcrypt = require("bcryptjs");

const getAllUsers = async function (req, res) {
  const users = await User.findAll();
  res.json(users);
};

const createUser = async function (req, res) {
  const user = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10), //req.body.password = password que puso el user
    roleId: 2,
  });

  res.json(user);
};
module.exports = { getAllUsers, createUser };
