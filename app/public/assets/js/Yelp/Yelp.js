'use strict';

// to do's
// pass through zipcode from trim.val field for line 12
// pass through city/locale as defined in line 37 instead of austin tx placeholder
// pass through term in 36 instead of placeholder

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'te8cuUAAywnS6fTyQVVOj1vRJ-ybh4BijgLA2wgVF6Hk3x70QSiymfYF5Day-HTlD1hwZkniAQcj8GSqId4LAdyjCmFBNoJfd5dDncvaV6PgiHXlPHC4fxqiE_QrW3Yx';

var zipcode = 78704;
var zipcode = zipcode ? zipcode : null;


// yelp only works up to 25 miles,
let radiusMiles = 50;

if (radiusMiles >= 25) {
  radiusMiles = 25;
} else {
  radiusMiles = 5;
};

// console.log('************************************************************');
// console.log(radiusMiles);
// console.log('************************************************************');

var radiusMeters = radiusMiles * 1600;


const searchRequest = {
  // term could be name of a business too / restaurant / food types, etc. 
  term: 'american',
  // put in city and locale   
  location: 'austin, tx' + '+' + zipcode,
  radius: radiusMeters

};

const client = yelp.client(apiKey);


// working part 

client.search(searchRequest).then(response => {
  let output = [];
  response.jsonBody.businesses.forEach(item => {
    if (output.length < 10 && !item.is_closed) {
      let objCopy = {}
      output.push({
        name: "Business name: " + item.name,
        rating: "User Rating: " + item.rating,
        thumbnail: "Thumbnail photo: " + item.image_url,
        href: "Thumbnail href: " + item.url,
        categories: item.categories.map(category => category.title),
        priceRating: item.price ? "Price: " + item.price : "No price available"
      });
    }
  })
  console.log(output);
}).catch(e => {
  console.log(e);
});

// pseudocode 

// first json response  ++++++++++++

// { id: 'JlOsQVol75X1O5fg2-Mo0g',
//   alias: 'its-all-good-bbq-spicewood-5',
//   name: 'It\'s All Good BBQ',
//   image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/_IcWjjm-AY9E1dQP7BApRA/o.jpg',
//   is_closed: false,
//   url: 'https://www.yelp.com/biz/its-all-good-bbq-spicewood-5?adjust_creative=y13XC-PDbfLLoQuIV4oGSg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=y13XC-PDbfLLoQuIV4oGSg',
//   review_count: 183,
//   categories: 
//    [ { alias: 'bbq', title: 'Barbeque' },
//      { alias: 'sandwiches', title: 'Sandwiches' } ],
//   rating: 4.5,
//   coordinates: { latitude: 30.36869, longitude: -98.07247 },
//   transactions: [],
//   price: '$$',
//   location: 
//    { address1: '22112 Hwy 71 W',
//      address2: null,
//      address3: '',
//      city: 'Spicewood',
//      zip_code: '78669',
//      country: 'US',
//      state: 'TX',
//      display_address: [ '22112 Hwy 71 W', 'Spicewood, TX 78669' ] },
//   phone: '+15122641744',
//   display_phone: '(512) 264-1744',
//   distance: 2982.38925715337 }