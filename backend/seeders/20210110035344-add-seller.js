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
    return queryInterface.bulkInsert('Seller', [{
      userId: 1,
      name: 'Shoppe',
      logo: 'shoppe@logo',
      description: 'shoppe@description'
    }, {
      userId: 4,
      name: 'khoa"s tiki',
      logo: 'tiki@logo',
      description: 'tiki@description'
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
