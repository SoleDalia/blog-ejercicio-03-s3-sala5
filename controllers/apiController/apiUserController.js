const { User } = require("../../models");

const getAllUsers = async function (req, res) {
  const users = await User.findAll();
  res.json(users);
};

const createUser = async function (req, res) {
  const user = await User.create({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    roleId: req.body.roleId,
  });

  res.json(user);
};
module.exports = { getAllUsers, createUser };
