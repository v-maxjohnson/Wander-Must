import React, { Component } from 'react';
import axios from "axios";

const authKey = "c62508752826c7d8";

export default class Wunderground extends Component {

    state = {
        highF: "",
        highC: "",
        lowF: "",
        lowC: ""
    }

    componentDidMount() {
        this.makeWunderAPICall();
    }

    makeWunderAPICall = () => {
        var queryURL;
        var startDate = this.props.startDate;
        var endDate = this.props.endDate;

        var startDateArray = [];
        startDateArray = startDate.split("-");
        var startMonth = startDateArray[1];
        var startDay = startDateArray[2];

        var endDateArray = [];
        endDateArray = endDate.split("-");
        var endMonth = endDateArray[1];
        var endDay = endDateArray[2];

        if (this.props.country === "usa") {
            queryURL = "https://api.wunderground.com/api/" + authKey + "/planner_" + startMonth + startDay + endMonth + endDay + "/q/" + this.props.admin + "/" + this.props.city + ".json";
        } else {
            queryURL = "https://api.wunderground.com/api/" + authKey + "/planner_" + startMonth + startDay + endMonth + endDay + "/q/" + this.props.country + "/" + this.props.city + ".json";
        }

        axios.get(queryURL)
            .then( (response) => {
                console.log(response);
                if (response) {
                    this.setState({
                        highF: response.data.trip.temp_high.avg.F,
                        highC: response.data.trip.temp_high.avg.C,
                        lowF: response.data.trip.temp_low.avg.F,
                        lowC: response.data.trip.temp_low.avg.C
                    });
                    //     //   } else {
                    //     //       <p>Data is not available for this city</p>
                    //     //   }
                }
            })
        // .catch(err => res.status(422).json(err));
    }

    render() {
        return (
            <div className="wunderground">
                <ul className="nav suitcase-nav">
                    <li className="nav-item ">
                        <p className="nav-link" id="highF">{"High Avg: " + this.state.highF + "° F"}</p>
                    </li>
                    <li className="nav-item ">
                        <p className="nav-link" id="highC">{"High Avg: " + this.state.highC + "° C"}</p>
                    </li>
                    <li className="nav-item ">
                        <p className="nav-link" id="lowF">{"Low Avg: " + this.state.lowF + "° F"}</p>
                    </li>
                    <li className="nav-item ">
                        <p className="nav-link" id="lowC">{"Low Avg: " + this.state.lowC + "° C"}</p>
                    </li>
                </ul>
            </div>
        )
    }
}