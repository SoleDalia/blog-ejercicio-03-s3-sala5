const { faker } = require("@faker-js/faker");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

faker.locale = "es";

module.exports = async () => {
  const users = [];
  const user = {
    firstname: "Soledad",
    lastname: "Campos",
    password: await bcrypt.hash("12345", 10),
    email: "sole@gmail.com",
    roleId: 1,
  };
  users.push(user);

  const password = await bcrypt.hash("12345", 10);
  for (let i = 0; i < 11; i++) {
    users.push({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: password,
      roleId: faker.datatype.number({ min: 2, max: 4 }),
    });
  }

  await User.bulkCreate(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
