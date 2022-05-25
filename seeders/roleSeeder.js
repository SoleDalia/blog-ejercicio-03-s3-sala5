const { Role } = require("../models");

module.exports = async () => {
  const roles = [
    {
      name: "admin",
      read: true,
      write: true,
      edit: true,
      main: true,
      writecomment: true,
      editcomment: true,
    },
    {
      name: "reader",
      read: true,
      write: false,
      edit: false,
      main: false,
      writecomment: true,
      editcomment: false,
    },
    {
      name: "editor",
      read: true,
      write: true,
      edit: true,
      main: false,
      writecomment: true,
      editcomment: true,
    },
    {
      name: "writer",
      read: true,
      write: true,
      edit: true,
      main: false,
      writecomment: true,
      editcomment: true,
    },
  ];

  await Role.bulkCreate(roles);
  console.log("[Database] Se corrió el seeder de Users.");
};
