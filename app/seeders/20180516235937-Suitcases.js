'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Suitcases', [{
        city: "Seattle, WA, USA",
        start_date: "2018-05-04 23:59:59",
        end_date: "2018-05-14 23:59:59",
        travel_category: "Adventure",
        notes: "Packing this all in one backpack.",
        user_id: 1
      },{
        city: "Chicago, IL, USA",
        start_date: "2018-05-04 23:59:59",
        end_date: "2018-05-14 23:59:59",
        travel_category: "Adventure",
        notes: "Packing this all in one backpack.",
        user_id: 2
      },{
        city: "Austin, TX, USA",
        start_date: "2018-06-04 23:59:59",
        end_date: "2018-06-14 23:59:59",
        travel_category: "Business",
        notes: "Packing this all in one backpack.",
        user_id: 1
      },{
        city: "Austin, TX, USA",
        start_date: "2018-06-04 23:59:59",
        end_date: "2018-06-14 23:59:59",
        travel_category: "Vacation",
        notes: "Bachelorette weekend!",
        user_id: 2
      }], {});
  
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Suitcases', null, {});

  }
};
