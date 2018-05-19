'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Suitcases', [{
        start_date: "2018-05-04 23:59:59",
        end_date: "2018-05-14 23:59:59",
        travel_category: "Adventure",
        notes: "Packing this all in one backpack.",
        locale_id: 1,
        user_id: 1
      },{
        start_date: "2018-05-04 23:59:59",
        end_date: "2018-05-14 23:59:59",
        travel_category: "Adventure",
        notes: "Packing this all in one backpack.",
        locale_id: 2,
        user_id: 2
      },{
        start_date: "2018-06-04 23:59:59",
        end_date: "2018-06-14 23:59:59",
        travel_category: "Business",
        notes: "Packing this all in one backpack.",
        locale_id: 3,
        user_id: 1
      },{
        start_date: "2018-06-04 23:59:59",
        end_date: "2018-06-14 23:59:59",
        travel_category: "Vacation",
        notes: "Bachelorette weekend!",
        locale_id: 3,
        user_id: 2
      }], {});
  
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Suitcases', null, {});

  }
};
