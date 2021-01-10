module.exports = (sequelize, DataTypes) => {
  const ProductReview = sequelize.define('ProductReview', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: DataTypes.STRING,
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    freezeTableName: true
  });

  ProductReview.associate = (models) => {
    ProductReview.belongsTo(models.Product, {
      foreignKey: 'productId',
      targetKey: 'id'
    });
  };

  return ProductReview;
};
