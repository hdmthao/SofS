module.exports = (sequelize, DataTypes) => {
  const PaymentResult = sequelize.define('PaymentResult', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    result: {
      type: DataTypes.STRING
    },
    update_time: {
      type: DataTypes.STRING
    },
    emailAddress: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    freezeTableName: true
  });

  return PaymentResult;
};
