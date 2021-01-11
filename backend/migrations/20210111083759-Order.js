/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('Order', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      buyerId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      shippingAddressId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      paymentMethod: {
        type: Sequelize.STRING,
        allowNull: false
      },
      paymentResultId: {
        type: Sequelize.INTEGER
      },
      itemsPrice: Sequelize.FLOAT,
      taxPrice: Sequelize.FLOAT,
      shippingPrice: Sequelize.FLOAT,
      totalPrice: Sequelize.FLOAT,
      isPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      paidAt: {
        type: Sequelize.DATE
      },
      isDelivered: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      deliveredAt: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('Order');
  }
};
