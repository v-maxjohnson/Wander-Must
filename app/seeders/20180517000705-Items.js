'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Items', [{
        item_name: 'Toothbrush',
        item_category: "toiletries",
      },{
        item_name: 'Toothpaste',
        item_category: "toiletries",
      },{
        item_name: 'Jacket',
        item_category: "clothing",
      },{
        item_name: 'Pajamas',
        item_category: "clothing",
      },{
        item_name: 'Hat',
        item_category: "accessories",
      }], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Items', null, {});

  }
};
