import React, { Component } from 'react';
// import "../styles/SuitcaseCard.css";
import Pixabay from "../utils/Pixabay";
import SuitcaseFrame from "../images/suitcaseFrame.png"

export default class SuitcaseCard extends Component {

    state = {
        cityImageSrc: ""
    }

    setCityImgSrc = (url) => {
        this.setState({ cityImgSrc: url })
    }
    


    render() {
      return (

        <div className="suitcase-partial container col-sm-12 col-md-6 col-lg-4" data-id="{this.props.id}">
            <div className="suitcaseCard">
                <div className="card bg-dark text-white no-shadow">
                    <div className="suitcaseWrapper card-img">
                        <a className="suitcase-link" href={"/suitcase/" + this.props.id}>
                        <Pixabay
                            city={this.props.city}
                            country={this.props.country}
                            setCityImageSrc={this.setCityImgSrc}
                        />
                            <img
                                className="suitcasePhoto img-responsive"
                                src={this.state.cityImageSrc} alt="City Skyline"
                            />
                            <img className="suitcaseFrame img-responsive" src={SuitcaseFrame} alt="Suitcase Frame" />
                        </a>
                    </div>
                    <div className="card-img-overlay">
                        <div className="title-div">
                            <h5 className="card-title suitcase-title"> {this.props.city} </h5>
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