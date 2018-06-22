'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'te8cuUAAywnS6fTyQVVOj1vRJ-ybh4BijgLA2wgVF6Hk3x70QSiymfYF5Day-HTlD1hwZkniAQcj8GSqId4LAdyjCmFBNoJfd5dDncvaV6PgiHXlPHC4fxqiE_QrW3Yx';

if (zipcode) {
  var zipcode = 21114;
} else {
  var zipcode = null;
}

if (radiusMiles >= 25) {
 var radiusMiles = 25; 
} else {
  // need to only accept integers
  var radiusMiles = 2;
};

var radiusMeters = radiusMiles * 1600;


const searchRequest = {
    // term could be name of a business too / restaurant / food types, etc. 
  term:'restaurant',
    // put in city and locale   
  location: 'annapolis, md' + ' ' + zipcode,
  radius: radiusMeters
  
};

const client = yelp.client(apiKey);

// client.search(searchRequest).then(response => {
//   var results = response;
//   results.forEach((element) => {
//     console.log(element);
//   })
// }) 


// working part 

client.search(searchRequest).then(response => {
  console.log(response.jsonBody.businesses[0]);
}).catch(e => {
  console.log(e);
});

// +~~+~++~+~+~+~+~+~+~+~ actually working part

// client.search(searchRequest).then(response => {
//   console.log(JSON.stringify(response, null, 4));
// }).catch(e => {
//   console.log(e);
// });

// _+~_!_!_!_!_!!_!_!_ actually working part 

// 

  //   console.log(response.jsonBody.businesses[i]);
    
  // }

//   const prettyJson = JSON.stringify(results, null, 4);
//   console.log(prettyJson);
// }).catch(e => {
//   console.log(e);
// });