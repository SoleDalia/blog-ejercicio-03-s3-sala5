module.exports = (sequelize, Model, DataTypes) => {
  class Role extends Model {}

  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      read: {
        type: DataTypes.BOOLEAN,
      },
      write: {
        type: DataTypes.BOOLEAN,
      },
      edit: {
        type: DataTypes.BOOLEAN,
      },
      main: {
        type: DataTypes.BOOLEAN,
      },
      writecomment: {
        type: DataTypes.BOOLEAN,
      },
      editcomment: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "role",
    }
  );

  return Role;
};
