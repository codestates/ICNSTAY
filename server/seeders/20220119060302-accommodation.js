'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('accommodation', [
      {
        id: 1,
        name: 'hotel deluna',
        location: 'Soeul',
        description: 'It is hotel deluna',
        minPrice: '20000원',
        due: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'hyri minbak',
        location: 'Seogwipo',
        description: 'It is hyri minbak',
        minPrice: '90000원',
        due: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'sinla hotel',
        location: 'Busan',
        description: 'It is sinla hotel',
        minPrice: '10000원',
        due: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        name: 'oasis',
        location: 'Here',
        description: 'It is oasis',
        minPrice: '60000원',
        due: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        name: 'oken sauna',
        location: 'There',
        description: 'It is oken sauna',
        minPrice: '70000원',
        due: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        name: 'fack hotel',
        location: 'Jeju',
        description: 'It is fack hotel',
        minPrice: '0원', 
        due: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        name: 'kenzip',
        location: 'Ulsan',
        description: 'It is kenzip',
        minPrice: '50000원',
        due: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 8,
        name: 'neorbunbang',
        location: 'Changwon',
        description: 'It is neorbunbang',
        minPrice: '0원',
        due: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 9,
        name: 'ssanbang',
        location: 'Incheon',
        description: 'It is ssanbang',
        minPrice: '0원',
        due: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('accommodation', null, {});
  }
};
