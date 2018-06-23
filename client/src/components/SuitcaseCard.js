import React, { Component } from 'react';
import "../styles/SuitcaseCard.css";
import SuitcaseFrame from "../images/suitcaseFrame.png"

export default class SuitcaseCard extends Component {
    render() {
      return (

        <div className="suitcase-partial container col-sm-12 col-md-6 col-lg-4" data-id="{this.props.id}">
            <div className="suitcaseCard">
                <div className="card bg-dark text-white no-shadow">
                    <div className="suitcaseWrapper card-img">
                        <a className="suitcase-link" href="/suitcase/{this.props.id}">
                            <img
                                className="suitcasePhoto img-responsive"
                                src={this.props.src} alt="City Skyline"
                                data-id="{this.props.id}"
                                data-city={this.props.city}
                                data-admin={this.props.localeAdmin}
                                data-country={this.props.country}
                                data-start={this.props.startDate}
                                data-end={this.props.endDate}
                            />
                            <img className="suitcaseFrame img-responsive" src={SuitcaseFrame} alt="Suitcase Frame" />
                        </a>
                    </div>
                    <div className="card-img-overlay">
                        <div className="title-div">
                            <h5 className="card-title suitcase-title" data-city={this.props.city}> {this.props.city} </h5>
                        </div>
                        <div className="trip-details">
                            <p className="badge travel-dates py-2">{this.props.startDate} - {this.props.endDate}</p>
                            <br/>
                            <p className="badge travel-category py-2">{this.props.category}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
      )
    }
}