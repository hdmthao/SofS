module.exports = (sequelize, DataTypes) => {
  const Seller = sequelize.define('Seller', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    logo: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    freezeTableName: true
  });

  Seller.associate = (models) => {
    Seller.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id'
    });

    Seller.hasMany(models.SellerReview, {
      foreignKey: 'sellerId'
    });
  };

  return Seller;
};
