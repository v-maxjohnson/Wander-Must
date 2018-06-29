import React, {
  Component
} from 'react';
const yelpAPI = require('yelp-api');
const apiKey = 'te8cuUAAywnS6fTyQVVOj1vRJ-ybh4BijgLA2wgVF6Hk3x70QSiymfYF5Day-HTlD1hwZkniAQcj8GSqId4LAdyjCmFBNoJfd5dDncvaV6PgiHXlPHC4fxqiE_QrW3Yx';
const yelp = new yelpAPI(apiKey);


export default class Yelp extends Component {

  state = {
    // these are user inputs
    sort_by: "",
    price: "",
    radiusMiles: 5
  }

  componentDidMount() {
    this.makeYelpCall();
  }

  radiusMiles = '';

  makeYelpCall = () => {
    if (this.state.radiusMiles >= 25) {
      this.state.radiusMiles = 25;
    }

    var radiusMeters = this.state.radiusMiles * 1600;


    let params = [{
      term: 'restaurants',
      //   location: this.props.city + "+" + this.props.country,
      location: 'austin, tx',
      radius: radiusMeters,
      sort_by: 'rating',
      price: '1'
    }];


    yelp.query('businesses/search', params).then(response => {
      let output = [];
      response.jsonBody.businesses.forEach(item => {
        if (output.length < 10 && !item.is_closed) {
          output.push({
            name: item.name,
            rating: item.rating,
            thumbnail: item.image_url,
            href: item.url,
            categories: item.categories.map(category => category.title),
            priceRating: item.price ? item.price : "No price available"
          });
        }
      })
      console.log(output);
    }).catch(err => {
      // Failure
      console.log(err);
    });

  }
}