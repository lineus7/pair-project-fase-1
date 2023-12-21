'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let data = [
      {
        name : `Paracetamol`,
        type : `Obat Panas`,
        price : 10000,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : `Paramex`,
        type : `Obat Panas`,
        price : 8000,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : `Dexamethasone`,
        type : `Obat Batuk`,
        price : 8000,
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        name : `Penicillin`,
        type : `Antibiotik`,
        price : 9000,
        createdAt : new Date(),
        updatedAt : new Date()
      },
    ]
    await queryInterface.bulkInsert(`Medicines`,data)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(`Medicines`,null)
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
