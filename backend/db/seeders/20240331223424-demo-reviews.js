'use strict';
const { Review } = require('../models')

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
   await Review.bulkCreate([
    {
      userId: 2,
      spotId: 1,
      review: "Great experience, loved it!",
      stars: 5
    },
    {
      userId: 3,
      spotId: 1,
      review: "Could be better, but overall not bad.",
      stars: 3
    },
    {
      userId: 4,
      spotId: 2,
      review: "Terrible service, would not recommend.",
      stars: 1
    },
    {
      userId: 5,
      spotId: 2,
      review: "Absolutely stunning virtual environment! The attention to detail is incredible.",
      stars: 5
    },
    {
      userId: 5,
      spotId: 3,
      review: "A virtual paradise! 5 stars without a doubt.",
      stars: 5
    },
    {
      userId: 6,
      spotId: 3,
      review: "The room felt a bit empty, but the graphics are top-notch.",
      stars: 3
    },
    {
      userId: 1,
      spotId: 4,
      review: "Encountered a few bugs, but nothing major. ",
      stars: 4
    },
    {
      userId: 3,
      spotId: 4,
      review: "The room design is impressive, but the interface could be more user-friendly.",
      stars: 3
    },
    {
      userId: 3,
      spotId: 5,
      review: "Needs more interactive elements, but still enjoyable.",
      stars: 4
    },
    {
      userId: 4,
      spotId: 5,
      review: "Lost track of time exploring this virtual wonderland.",
      stars: 5
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3, 4, 5, 6] }
    }, {})
  }
};
