/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Product', [{
      name: 'quần què',
      image: '/images/quan_que.jpg',
      brand: 'La Pie',
      categoryId: 1,
      sellerId: 1,
      description: 'Cái quần què nè',
      price: 333,
      countInStock: 69
    }, {
      name: 'Bleu de Chanel',
      image: 'images/bleu-de-chanel.jpg',
      brand: 'Chanel',
      categoryId: 2,
      sellerId: 2,
      description: 'Nước hoa nè',
      price: 33333,
      countInStock: 2
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
