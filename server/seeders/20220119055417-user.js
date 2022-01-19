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
    await queryInterface.bulkInsert( 'users', [
      {
        id: 1,
        username: 'tia',
        email: 'tia@code.com',
        mobile: '010-0000-0000',
        social: 'kakao',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 2,
        username: 'jin',
        email: 'jin@code.com',
        mobile: '010-0000-0000',
        social: 'kakao',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 3,
        username: 'sean',
        email: 'sean@code.com',
        mobile: '010-0000-0000',
        social: 'kakao',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 4,
        username: 'ho',
        email: 'ho@code.com',
        mobile: '010-0000-0000',
        social: 'kakao',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 5,
        username: 'min',
        email: 'min@code.com',
        mobile: '010-0000-0000',
        social: 'kakao',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 6,
        username: 'dubu',
        email: 'dubu@kakao.com',
        mobile: '010-0000-0000',
        social: 'kakao',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
      },
      {
        id: 7,
        username: 'louis',
        email: 'louis@kakao.com',
        mobile: '010-0000-0000',
        social: 'kakao',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
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
    await queryInterface.bulkDelete('user', null, {})
  }
};