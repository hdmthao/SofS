'use strict';

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
   return queryInterface.bulkInsert('UserState', [{
     state: 'ACTIVATE',
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     state: 'BLOCKED',
     createdAt: new Date(),
     updatedAt: new Date()
   }, {
     state: 'BANNED',
     createdAt: new Date(),
     updatedAt: new Date()
   }])
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
