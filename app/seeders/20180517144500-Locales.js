'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Locales', [{
        locale_name: "Seattle, WA, USA"
      },{
        locale_name: "Chicago, IL, USA"
      },{
        locale_name: "Austin, TX, USA"
      }], {});
  
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Locales', null, {});

  }
};
