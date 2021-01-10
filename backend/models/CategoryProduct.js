module.exports = (sequelize, DataTypes) => {
  const CategoryProduct = sequelize.define('CategoryProduct', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    freezeTableName: true
  });

  CategoryProduct.associate = (models) => {
    CategoryProduct.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      targetKey: 'id'
    });

    CategoryProduct.belongsTo(models.Product, {
      foreignKey: 'productId',
      targetKey: 'id'
    });
  };

  return CategoryProduct;
};
