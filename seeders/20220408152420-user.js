'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          firstName: 'Ryan',
          lastName: 'Bridges',
          email: 'ringodingo@thebeatles.com',
          password: 'password123',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ,
        {
          firstName: 'Dan',
          lastName: 'Jobs',
          email: 'stevejobs@demo.com',
          password: 'timapple2024',
          createdAt: new Date(),
          updatedAt: new Date() 
        }
      ]
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
};
