
module.exports = function (sequelize, DataTypes) {
  const todo = sequelize.define('todo', {
    id: { type: DataTypes.UUID, primaryKey: true },
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    isactive: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return todo;
};
