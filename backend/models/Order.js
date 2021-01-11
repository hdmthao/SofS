module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    shippingAddressId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false
    },
    paymentResultId: {
      type: DataTypes.INTEGER
    },
    itemsPrice: DataTypes.INTEGER,
    taxPrice: DataTypes.INTEGER,
    shippingPrice: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isDelivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false1
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    freezeTableName: true
  });

  return Order;
};
