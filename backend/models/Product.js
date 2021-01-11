module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING
    },
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    countInStock: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    freezeTableName: true
  });

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      targetKey: 'id'
    });

    Product.hasMany(models.ProductReview, {
      foreignKey: 'productId',
      as: 'reviews'
    });

    Product.belongsTo(models.Seller, {
      foreignKey: 'sellerId',
      targetKey: 'id',
      as: 'seller'
    });
  };

  return Product;
};
