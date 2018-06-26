import React, { Component } from 'react';
const yelp = require('yelp-fusion');
'use strict';

const apiKey = 'te8cuUAAywnS6fTyQVVOj1vRJ-ybh4BijgLA2wgVF6Hk3x70QSiymfYF5Day-HTlD1hwZkniAQcj8GSqId4LAdyjCmFBNoJfd5dDncvaV6PgiHXlPHC4fxqiE_QrW3Yx';
var radiusMiles = 5;

export default class Yelp extends Component {

  state = {
    // these are user inputs
    sort_by: "", 
    price: "",
    radius: ""
    // may have to add output values in state 
}

  componentDidMount() {
    this.makeYelpCall();
}

// yelp only works up to 25 miles,
makeYelpCall = () => {
if (radiusMiles >= 25) {
  radiusMiles = 25;
}

var radiusMeters = radiusMiles * 1600;


const searchRequest = {
  // term could be name of a business too / restaurant / food types, etc. 
  term: '',
  location: this.props.city + "+" + this.props.country,
  radius: radiusMeters,
  sort_by: 'rating',
  price: "1"

};

const client = yelp.client(apiKey);



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

}

render() {
  return (
      <div className="yelp" >
        {this.props.children}
      </div>
  )
}

}