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
      },{
        item_name: 'Sunscreen',
        item_category: "toiletries",
      },{
        item_name: 'Earrings',
        item_category: "accessories",
      },{
        item_name: 'Watch',
        item_category: "accessories",
      },{
        item_name: 'Smart Watch',
        item_category: "electronics",
      },{
        item_name: 'Sunglasses',
        item_category: "accessories",
      },{
        item_name: 'Binoculars',
        item_category: "accessories",
      },{
        item_name: 'Underwear',
        item_category: "clothing",
      },{
        item_name: 'Deodorant',
        item_category: "toiletries",
      },{
        item_name: 'iPad/tablet',
        item_category: "electronics",
      },{
        item_name: 'Chargers',
        item_category: "electronics",
      },{
        item_name: 'Laptop',
        item_category: "electronics",
      },{
        item_name: 'Compass',
        item_category: "accessories",
      },{
        item_name: 'Video camera',
        item_category: "electronics",
      },{
        item_name: 'SLR',
        item_category: "electronics",
      },{
        item_name: '3DS/Switch/Portable Games',
        item_category: "electronics",
      },{
        item_name: 'Chapstick',
        item_category: "toiletries",
      },{
        item_name: 'Dress',
        item_category: "clothing",
      },{
        item_name: 'Suit',
        item_category: "clothing",
      },{
        item_name: 'Ibuprofen',
        item_category: "toiletries",
      },{
        item_name: 'Sleeping mask',
        item_category: "accessories",
      },{
        item_name: 'Books/Magazines',
        item_category: "accessories",
      },{
        item_name: 'Kindle/eBook Reader',
        item_category: "electronics",
      },{
        item_name: 'Socks',
        item_category: "clothing",
      },{
        item_name: 'Floss',
        item_category: "toiletries",
      },{
        item_name: 'Contact fluid/container',
        item_category: "toiletries",
      },{
        item_name: 'Hand Sani',
        item_category: "toiletries",
      },{
        item_name: 'Tie',
        item_category: "clothing",
      },{
        item_name: 'Sweatshirt',
        item_category: "clothing",
      },{
        item_name: 'Windbreaker',
        item_category: "clothing",
      },{
        item_name: 'Personal lucky charm',
        item_category: "accessories",
      },{
        item_name: 'Glasses',
        item_category: "accessories",
      },{
        item_name: 'Dress socks',
        item_category: "clothing",
      },{
        item_name: 'Neck pillow',
        item_category: "accessories",
      },{
        item_name: 'Wireless headphones',
        item_category: "electronics",
      },{
        item_name: 'Water bottle',
        item_category: "accessories",
      },{
        item_name: 'External battery pack',
        item_category: "electronics",
      },{
        item_name: 'Drawing pad/utensil',
        item_category: "accessories",
      },{
        item_name: 'Scarf',
        item_category: "accessories",
      },{
        item_name: 'Q-Tips',
        item_category: "toiletries",
      },{
        item_name: 'Shaving cream/razor',
        item_category: "toiletries",
      },{
        item_name: 'Boots',
        item_category: "clothing",
      },{
        item_name: 'Towel',
        item_category: "accessories",
      },{
        item_name: 'Acne cream',
        item_category: "toiletries",
      },{
        item_name: 'Hiking boots',
        item_category: "clothing",
      },{
        item_name: 'Sun Dress',
        item_category: "clothing",
      },{
        item_name: 'Make-up',
        item_category: "toiletries",
      },{
        item_name: 'Hair brush',
        item_category: "toiletries",
      },{
        item_name: 'IBS meds',
        item_category: "toiletries",
      },{
        item_name: 'Sandals',
        item_category: "clothing",
      },{
        item_name: 'Bras',
        item_category: "clothing",
      },{
        item_name: 'Sports bras',
        item_category: "clothing",
      },{
        item_name: 'Bikini',
        item_category: "clothing",
      },{
        item_name: 'Swim shorts',
        item_category: "clothing",
      },{
        item_name: 'Gym clothes',
        item_category: "clothing",
      },{
        item_name: 'Fidget spinner',
        item_category: "accessories",
      },{
        item_name: 'Hand moisturizer',
        item_category: "toiletries",
      },{
        item_name: 'Carton of smokes',
        item_category: "accessories",
      },{
        item_name: 'Sealed airplane snacks',
        item_category: "accessories",
      },{
        item_name: 'Tourguide Book',
        item_category: "accessories",
      },{
        item_name: 'Homework/work material',
        item_category: "accessories",
      },{
        item_name: 'Sleep noise machine',
        item_category: "electronics",
      },{
        item_name: 'Gloves',
        item_category: "accessories",
      },{
        item_name: 'Power converter',
        item_category: "electronics",
      },{
        item_name: 'DVDs/Blu Rays',
        item_category: "electronics",
      },{
        item_name: 'iPod',
        item_category: "electronics",
      },{
        item_name: 'Gum',
        item_category: "accessories",
      },{
        item_name: 'Foreign currency',
        item_category: "accessories",
      },{
        item_name: 'Tomagotchi',
        item_category: "electronics",
      },{
        item_name: 'Hangover meds',
        item_category: "toiletries",
      },{
        item_name: 'Sea bering meds',
        item_category: "toiletries",
      },{
        item_name: 'Aderall',
        item_category: "toiletries",
      },{
        item_name: 'Bandana',
        item_category: "accessories",
      },{
        item_name: 'Bug spray',
        item_category: "toiletries",
      },{
        item_name: 'Toenail clipper',
        item_category: "toiletries",
      },{
        item_name: 'Caffeine pills',
        item_category: "toiletries",
      },{
        item_name: 'Stress squeeze ball',
        item_category: "accessories",
      },{
        item_name: 'Cologne',
        item_category: "toiletries",
      },{
        item_name: 'Jeans',
        item_category: "clothing",
      },{
        item_name: 'Pants',
        item_category: "clothing",
      },{
        item_name: 'Hair massage prong',
        item_category: "accessories",
      },{
        item_name: 'Belts',
        item_category: "clothing",
      },{
        item_name: 'Passport',
        item_category: "accessories",
      },{
        item_name: 'Perfume',
        item_category: "toiletries",
      },{
        item_name: 'Tennis shoes',
        item_category: "clothing",
      },{
        item_name: 'Glasses Cleaner',
        item_category: "accessories",
      },{
        item_name: 'T-shirt',
        item_category: "clothing",
      },{
        item_name: 'Cargo Pants',
        item_category: "clothing",
      },{
        item_name: 'Mosquito Net',
        item_category: "accessories",
      },{
        item_name: 'Sleeping Bag',
        item_category: "accessories",
      },{
        item_name: 'Lantern',
        item_category: "accessories",
      },{
        item_name: 'Flashlight',
        item_category: "electronics",
      },{
        item_name: 'Water Purifier',
        item_category: "accessories",
      },{
        item_name: 'Pots and pans',
        item_category: "accessories",
      },{
        item_name: 'Tent',
        item_category: "accessories",
      },{
        item_name: 'Hairclips',
        item_category: "accessories",
      },
    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Items', null, {});

  }
};
