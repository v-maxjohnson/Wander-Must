'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {



      return queryInterface.bulkInsert('Users', [{
        username: 'JohnDoe',
        email: "false@gmail.com",
        password: "password",
        gender: "male",
        user_image: "http://via.placeholder.com/150x150"
      }, {
        username: 'JaneDoe',
        email: "true@gmail.com",
        password: "password",
        gender: "female",
        user_image: "http://via.placeholder.com/150x150"
      }], {});
    
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
