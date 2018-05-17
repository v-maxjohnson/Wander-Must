'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('suitcase_items', [{
        item_id: 1,
        suitcase_id: 1
      },{
        item_id: 2,
        suitcase_id: 1
      },{
        item_id: 3,
        suitcase_id: 1
      },{
        item_id: 2,
        suitcase_id: 2
      },{
        item_id: 3,
        suitcase_id: 2
      },{
        item_id: 4,
        suitcase_id: 2
      },{
        item_id: 3,
        suitcase_id: 3
      },{
        item_id: 4,
        suitcase_id: 3
      },{
        item_id: 5,
        suitcase_id: 3
      },{
        item_id: 5,
        suitcase_id: 4
      },{
        item_id: 1,
        suitcase_id: 4
      },{
        item_id: 2,
        suitcase_id: 4
      }], {});
  
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('suitcase_items', null, {});

  }
};
