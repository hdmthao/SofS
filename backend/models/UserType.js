module.exports = (sequelize, DataTypes) => {
  const UserType = sequelize.define('UserType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    type: DataTypes.ENUM(['admin', 'seller', 'buyer']),
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    freezeTableName: true
  });

  return UserType;
};
