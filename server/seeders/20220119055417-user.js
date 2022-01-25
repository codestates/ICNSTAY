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
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-0000-0000',
        social: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        username: 'jin',
        email: 'jin@code.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-0000-0000',
        social: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        username: 'sean',
        email: 'sean@code.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-0000-0000',
        social: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        username: 'ho',
        email: 'ho@code.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-0000-0000',
        social: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        username: 'min',
        email: 'min@code.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-0000-0000',
        social: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        username: 'dubu',
        email: 'dubu@kakao.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-0000-0000',
        social: 'kakao',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        username: 'louis',
        email: 'louis@kakao.com',
        password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
        mobile: '010-0000-0000',
        social: 'kakao',
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
    await queryInterface.bulkDelete('user', null, {})
  }
};
