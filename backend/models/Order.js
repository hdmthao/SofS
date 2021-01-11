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
    itemsPrice: DataTypes.FLOAT,
    taxPrice: DataTypes.FLOAT,
    shippingPrice: DataTypes.FLOAT,
    totalPrice: DataTypes.FLOAT,
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    paidAt: {
      type: DataTypes.DATE
    },
    isDelivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deliveredAt: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    freezeTableName: true
  });

  Order.associate = (models) => {
    Order.belongsTo(models.ShippingAddress, {
      foreignKey: 'shippingAddressId',
      as: 'shippingAddress'
    });

    Order.belongsTo(models.User, {
      foreignKey: 'buyerId',
      as: 'user'
    });

    Order.hasMany(models.OrderDetail, {
      targetKey: 'id',
      foreignKey: 'orderId',
      as: 'orderItems'
    });
  };

  return Order;
};
