'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'te8cuUAAywnS6fTyQVVOj1vRJ-ybh4BijgLA2wgVF6Hk3x70QSiymfYF5Day-HTlD1hwZkniAQcj8GSqId4LAdyjCmFBNoJfd5dDncvaV6PgiHXlPHC4fxqiE_QrW3Yx';

if (zipcode) {
  var zipcode = 78704;
} else {
  var zipcode = null;
}

if (radiusMiles >= 25) {
 var radiusMiles = 25; 
} else {
  // need to only accept integers
  var radiusMiles = 25;
};

var radiusMeters = radiusMiles * 1600;


const searchRequest = {
    // term could be name of a business too / restaurant / food types, etc. 
  term:'mexican food',
    // put in city and locale   
  location: 'austin, tx+'+zipcode,
  radius: radiusMeters
  
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  var results = response;
  results.forEach((element) => {
    console.log(element);
  })
}) 
  //   console.log(response.jsonBody.businesses[i]);
    
  // }

//   const prettyJson = JSON.stringify(results, null, 4);
//   console.log(prettyJson);
// }).catch(e => {
//   console.log(e);
// });