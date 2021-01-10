module.exports = (sequelize, DataTypes) => {
  const SellerReview = sequelize.define('SellerReview', {
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

  SellerReview.associate = (models) => {
    SellerReview.belongsTo(models.Seller, {
      foreignKey: 'sellerId',
      targetKey: 'id'
    });
  };

  return SellerReview;
};
