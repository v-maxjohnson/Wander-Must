'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Locales', [{
        locale_city: "seattle",
        locale_admin: "wa",
        locale_country: "usa"
      },{
        locale_city: "chicago",
        locale_admin: "il",
        locale_country: "usa"
      },{
        locale_city: "austin",
        locale_admin: "tx",
        locale_country: "usa"
      }], {});
  
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Locales', null, {});

  }
};

