'use strict';
const { User } = require('../models');
const bcrypt = require('bcryptjs')

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
   await User.bulkCreate([
      {
        firstName: 'Brian',
        lastName: 'Test',
        email: 'brian@user.io',
        username: 'bk4dawin',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Leslie',
        lastName: 'Cooper',
        email: 'leslie@user.io',
        username: 'leslie_r',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Ryan',
        lastName: 'Moon',
        email: 'ryan@user.io',
        username: 'rickmoon',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'John',
        lastName: 'Tools',
        email: 'johntools@email.com',
        username: 'jtools4',
        hashedPassword: bcrypt.hashSync('password4')
      },
      {
        firstName: 'Carly',
        lastName: 'Johnson',
        email: 'carly@email.com',
        username: 'icarly',
        hashedPassword: bcrypt.hashSync('password5')
      },
      {
        firstName: 'Justin',
        lastName: 'Fields',
        email: 'jhimfields@email.com',
        username: 'jfields1',
        hashedPassword: bcrypt.hashSync('password6')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['bk4dawin', 'leslie_r', 'rickmoon'] }
    }, {});

  }
};
