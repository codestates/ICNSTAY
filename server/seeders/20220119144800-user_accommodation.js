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
    await queryInterface.bulkInsert('user_accommodations', [
      {
        id: 1,
        userId: 1,
        accommodationId: 1,
        checkInDate: '1월 19일(수)',
        checkOutDate: '1월 21일(금)',
        biddingPrice: '200,000원',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        accommodationId: 2,
        checkInDate: '1월 17일(월)',
        checkOutDate: '1월 21일(금)',
        biddingPrice: '400,000원',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId: 2,
        accommodationId: 2,
        checkInDate: '1월 20일(목)',
        checkOutDate: '1월 23일(일)',
        biddingPrice: '450,000원',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        userId: 1,
        accommodationId: 9,
        checkInDate: '1월 19일(수)',
        checkOutDate: '1월 21일(금)',
        biddingPrice: '150,000원',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        userId: 3,
        accommodationId: 5,
        checkInDate: '1월 20일(목)',
        checkOutDate: '1월 23일(일)',
        biddingPrice: '450,000원',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        userId: 3,
        accommodationId: 2,
        checkInDate: '1월 20일(목)',
        checkOutDate: '1월 23일(일)',
        biddingPrice: '500,000원',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        userId: 2,
        accommodationId: 2,
        checkInDate: '1월 20일(목)',
        checkOutDate: '1월 23일(일)',
        biddingPrice: '550,000원',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user_accommodations', null, {});
  }
};
