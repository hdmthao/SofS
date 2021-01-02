module.exports = (sequelize, DataTypes) => {
  const UserState = sequelize.define('UserState', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true
  });

  return UserState;
};
