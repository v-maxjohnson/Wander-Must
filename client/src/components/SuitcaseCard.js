import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';

import "../styles/SuitcaseCard.css";
import SuitcaseFrame from "../images/suitcaseFrame.png";

let cityNoUnderscores = "";

export default class SuitcaseCard extends Component {

    renderCityWithoutUnderscores = () => {
        cityNoUnderscores = this.props.city.replace(/_/g, ' ');
        return (
            cityNoUnderscores
        )
    }

    render() {
        return (

            <div className="suitcase-partial container col-sm-12 col-md-6 col-lg-4">
                <div className="suitcaseCard">
                    <div className="card bg-dark text-white no-shadow">
                        <div className="suitcaseWrapper card-img">
                            <Link className="suitcase-link" to={"/suitcase/" + this.props.id}>
                                <img
                                    className="suitcasePhoto img-responsive"
                                    src={this.props.suitcaseImage} alt="City Skyline"
                                />
                                <img className="suitcaseFrame img-responsive" src={SuitcaseFrame} alt="Suitcase Frame" />
                            </Link>
                        </div>
                        <div className="card-img-overlay">
                            <div className="title-div">
                                <h5 className="card-title suitcase-title">{this.renderCityWithoutUnderscores()}</h5>
                            </div>
                            <div className="trip-details">
                                <p className="badge travel-dates py-2">
                                    <Moment format="MMM DD, YYYY">{this.props.startDate}</Moment> - <Moment format="MMM DD, YYYY">{this.props.endDate}
                                    </Moment></p>
                                <p className="badge travel-category py-2">{this.props.category.toLowerCase()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}