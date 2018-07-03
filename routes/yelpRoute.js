var express = require("express");
const yelpAPI = require('yelp-api');
const apiKey = 'te8cuUAAywnS6fTyQVVOj1vRJ-ybh4BijgLA2wgVF6Hk3x70QSiymfYF5Day-HTlD1hwZkniAQcj8GSqId4LAdyjCmFBNoJfd5dDncvaV6PgiHXlPHC4fxqiE_QrW3Yx';
const yelp = new yelpAPI(apiKey);


module.exports = function (app) {

let params = [];

app.post('/yelp', (req, res) => {
  params = req.body;
  console.log(params)
  yelp.query('businesses/search', params)
    .then(response => {
      res.json(JSON.parse(response));      
    }).catch(err => {
      // Failure
      res.json(err);
    });
});

};