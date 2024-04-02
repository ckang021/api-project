'use strict';

const { Booking } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
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
   await Booking.bulkCreate([
    {
      spotId: 1,
      userId: 2,
      startDate: new Date('2024-02-17'),
      endDate: new Date('2024-02-20')
    },
    {
      spotId: 1,
      userId: 3,
      startDate: new Date('2024-03-01'),
      endDate: new Date('2020-03-04')
    },
    {
      spotId: 2,
      userId: 4,
      startDate: new Date('2024-04-07'),
      endDate: new Date('2024-04-10')
    },
    {
      spotId: 2,
      userId: 5,
      startDate: new Date('2024-04-17'),
      endDate: new Date('2024-04-20')
    },
    {
      spotId: 4,
      userId: 6,
      startDate: new Date('2024-05-17'),
      endDate: new Date('2024-05-20')
    },
    {
      spotId: 6,
      userId: 1,
      startDate: new Date('2024-04-09'),
      endDate: new Date('2024-04-13')
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4, 5, 6]}
    }, {})
  }
};
