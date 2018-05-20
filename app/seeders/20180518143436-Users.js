'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {



      return queryInterface.bulkInsert('Users', [{
        username: 'JohnDoe',
        email: "false@gmail.com",
        password: "password",
        gender: "male",
        user_image: "/assets/img/faces/raccoon.png"
      }, {
        username: 'JaneDoe',
        email: "true@gmail.com",
        password: "password",
        gender: "female",
        user_image: "/assets/img/faces/toucan.png"
      }], {});
    
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
