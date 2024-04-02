'use strict';
const { Spot } = require('../models')

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
   await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "123 Virtual Avenue",
        city: "Neo Metropolis",
        state: "VR",
        country: "Byteverse",
        lat: 0.123456,
        lng: 0.654321,
        name: "Byteverse Plaza",
        description: "A bustling hub where avatars gather to socialize and explore virtual worlds.",
        price: 100.00
      },
      {
        ownerId: 1,
        address: "456 Pixel Lane",
        city: "Cyberburg",
        state: "VR",
        country: "Byteverse",
        lat: 1.234567,
        lng: 1.543210,
        name: "Digital Oasis",
        description: "An immersive escape where users can relax, play games, and attend virtual events.",
        price: 75.00
      },
      {
        ownerId: 1,
        address: "789 Hologram Blvd",
        city: "Techopolis",
        state: "AR",
        country: "Technoland",
        lat: 0.987654,
        lng: 2.345678,
        name: "Techlandia",
        description: "A mixed-reality wonderland where the physical and digital worlds converge.",
        price: 120.00
      },
      {
        ownerId: 2,
        address: "321 Virtual Street",
        city: "Virtual Vista",
        state: "VR",
        country: "Technoland",
        lat: 0.543210,
        lng: 3.456789,
        name: "Virtual Nexus",
        description: "A cutting-edge virtual environment where creativity knows no bounds.",
        price: 90.00
      },
      {
        ownerId: 2,
        address: "654 Cyberspace Avenue",
        city: "Pixel City",
        state: "VR",
        country: "Byteverse",
        lat: 2.345678,
        lng: 2.234567,
        name: "Pixel Paradise",
        description: "Explore lush digital landscapes and discover hidden wonders in virtual reality.",
        price: 110.00
      },
      {
        ownerId: 3,
        address: "987 Code Lane",
        city: "Bitburg",
        state: "VR",
        country: "Byteverse",
        lat: 1.234567,
        lng: 4.567890,
        name: "Code Haven",
        description: "A developer's paradise where lines of code shape worlds and dreams.",
        price: 80.00
      },
      {
        ownerId: 3,
        address: "741 Virtual Boulevard",
        city: "Quantum City",
        state: "AR",
        country: "Technoland",
        lat: 3.456789,
        lng: 3.123456,
        name: "Quantum Hub",
        description: "Embark on a journey through quantum dimensions and unlock the mysteries of the digital universe.",
        price: 150.00
      },
      {
        ownerId: 4,
        address: "369 Digital Drive",
        city: "Digitalopolis",
        state: "VR",
        country: "Byteverse",
        lat: 2.345678,
        lng: 5.678901,
        name: "Digital Center",
        description: "Where technology meets imagination, and reality blends with fantasy.",
        price: 95.00
      },
      {
        ownerId: 4,
        address: "852 Bit Avenue",
        city: "Virtual Valley",
        state: "AR",
        country: "Technoland",
        lat: 4.567890,
        lng: 4.012345,
        name: "Virtual Vista",
        description: "Escape to a world of pixels and bytes, where every moment is a digital delight.",
        price: 125.00
      },
      {
        ownerId: 5,
        address: "159 Data Street",
        city: "Pixelburg",
        state: "VR",
        country: "Byteverse",
        lat: 3.456789,
        lng: 6.789012,
        name: "Pixel Dome",
        description: "Enter the digital realm and witness the wonders of virtual reality.",
        price: 100.00
      },
      {
        ownerId: 5,
        address: "456 Code Lane",
        city: "Tech City",
        state: "AR",
        country: "Technoland",
        lat: 5.678901,
        lng: 5.678901,
        name: "Tech Haven",
        description: "A haven for tech enthusiasts, where innovation sparks new possibilities.",
        price: 130.00
      },
      {
        ownerId: 6,
        address: "789 Quantum Boulevard",
        city: "Byteburg",
        state: "VR",
        country: "Byteverse",
        lat: 4.567890,
        lng: 7.890123,
        name: "Byte Hub",
        description: "A central hub where bytes converge, shaping the digital landscape.",
        price: 105.00
      },
      {
        ownerId: 6,
        address: "123 Virtual Street",
        city: "Pixelopolis",
        state: "AR",
        country: "Byteverse",
        lat: 6.789012,
        lng: 6.789012,
        name: "Pixel Plaza",
        description: "A vibrant pixelated cityscape where creativity thrives and imagination knows no limits.",
        price: 140.00
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5, 6]}
    }, {})
  }
};
