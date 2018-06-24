import React, { Component } from 'react';
import axios from "axios";

export default class Wunderground extends Component {
  const authKey = "c62508752826c7d8";

  var startDate = this.props.startDate;
  var endDate = this.props.endDate;



  var startDateArray = [];
  startDateArray = startDate.split("-");
  var startMonth = startDateArray[0];
  var startDay = startDateArray[1];

  var endDateArray = [];
  endDateArray = endDate.split("-");
  var endMonth = endDateArray[0];
  var endDay = endDateArray[1];


  makeWunderAPICall = () => {
    if (this.props.country === "usa") {
            var queryURL = "https://api.wunderground.com/api/" + authKey + "/planner_" + startMonth + startDay + endMonth + endDay + "/q/" + this.props.admin + "/" + this.props.city + ".json";
        } else {
            var queryURL = "https://api.wunderground.com/api/" + authKey + "/planner_" + startMonth + startDay + endMonth + endDay + "/q/" + this.props.country + "/" + this.props.city + ".json";
        }

        
    axios.get(queryURL)
    .then(function (response) {

      if (response.trip.temp_high.avg.F !== "") {
        <ul className="nav suitcase-nav">
          <li className="nav-item ">
            <p className="nav-link" id="highF"></p>
          </li>
          <li className="nav-item ">
            <p className="nav-link" id="highC"></p>
          </li>
          <li className="nav-item ">
            <p className="nav-link" id="lowF"></p>
          </li>
          <li className="nav-item ">
            <p className="nav-link" id="lowC"></p>
          </li>
        </ul>
      } else {
          <p>Data is not available for this city</p>
      }

  })
    .catch(err => res.status(422).json(err));


  render() {
    return (
      <div className="wunderground" >
          {this.makeWunderAPICall()}
      </div>
    )
  }
}

// $("#highF").html("High Avg: " + response.trip.temp_high.avg.F + "&deg; F");
//           $("#highC").html("High Avg: " + response.trip.temp_high.avg.C + "&deg; C");

//           $("#lowF").html("Low Avg: " + response.trip.temp_low.avg.F + "&deg; F");
//           $("#lowC").html("Low Avg: " + response.trip.temp_low.avg.C + "&deg; C");


