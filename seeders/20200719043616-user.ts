'use strict'

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
    await queryInterface.bulkInsert('User', [
      {
        id: '118208171974925555970',
        name: 'Juhyun Kim',
        email: 'juhyun.kim@lindsey.edu',
        profileURL:
          'https://lh5.googleusercontent.com/-izem_g3akCI/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucnPdjTJmJh-mWmks-NfgTd-DLo3Uw/photo.jpg',
      },
    ])
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('User', null, {})
  },
}
