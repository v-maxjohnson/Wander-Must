import React, { Component } from 'react';
import "../styles/Suitcase.css";

export default class Suitcases extends Component {
    render() {
      return (

        <div className="suitcase-partial container col-sm-12 col-md-6 col-lg-4" data-id="{this.props.id}">
            <div className="suitcaseCard">
                <div className="card bg-dark text-white no-shadow">
                    <div className="suitcaseWrapper card-img">
                        <a className="suitcase-link" href="/suitcase/{this.props.id}">
                            <img className="suitcasePhoto img-responsive" src="" alt="Card image" data-id="{this.props.id}" data-city={this.props.Locale.locale_city}
                                data-admin={this.props.Locale.locale_admin} data-country={this.props.Locale.locale_country} data-start={{this:start_date}}
                                data-end={{this:end_date}}/>
                            <img className="suitcaseFrame img-responsive" src="/assets/img/suitcaseFrame.png" alt="Suitcase Frame" />
                        </a>
                    </div>
                    <div className="card-img-overlay">
                        <div className="title-div">
                            <h5 className="card-title suitcase-title" data-city="{this.props.Locale.locale_city}"> {this.props.Locale.locale_city} </h5>
                        </div>
                        <div className="trip-details">
                            <p className="badge travel-dates py-2">{this.props.start_date} - {this.props.end_date}</p>
                            <p className="badge travel-category py-2">{this.props.travel_category}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
      )
    }
}