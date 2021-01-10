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
    return queryInterface.bulkInsert('User', [{
      userTypeId: 2,
      email: 'aka_seller@gmail.com',
      password: '$2b$08$k/8xVEN3MbnRQh9goCNf1.H75FRdSiDfnX/L9JVTMU0GthjZCKuJi',
      name: 'aka_seller'
    }, {
      userTypeId: 3,
      email: 'aka_buyer@gmail.com',
      password: '$2b$08$k/8xVEN3MbnRQh9goCNf1.H75FRdSiDfnX/L9JVTMU0GthjZCKuJi',
      name: 'aka_buyer'
    }, {
      userTypeId: 3,
      email: 'khoa_buyer@gmail.com',
      password: '$2b$08$k/8xVEN3MbnRQh9goCNf1.H75FRdSiDfnX/L9JVTMU0GthjZCKuJi',
      name: 'khoa_buyer'
    }, {
      userTypeId: 2,
      email: 'khoa_seller@gmail.com',
      password: '$2b$08$k/8xVEN3MbnRQh9goCNf1.H75FRdSiDfnX/L9JVTMU0GthjZCKuJi',
      name: 'khoa_seller'
    }, {
      userTypeId: 3,
      email: 'san_buyer@gmail.com',
      password: '$2b$08$k/8xVEN3MbnRQh9goCNf1.H75FRdSiDfnX/L9JVTMU0GthjZCKuJi',
      name: 'san_buyer'
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
