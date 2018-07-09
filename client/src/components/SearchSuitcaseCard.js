import React, { Component } from 'react';
import Moment from 'react-moment';
import Pixabay from "../utils/Pixabay";
import "../styles/SuitcaseCard.css";
import SuitcaseFrame from "../images/suitcaseFrame.png"
import GenderIcon from './GenderIcon';

let gender = "fa";

export default class SearchSuitcaseCard extends Component {

    state = {
        cityImageSrc: "",
        genderIconClass: "fa"
    }

    componentDidMount() {
        this.setGenderClassString();
    }

    setGenderClassString = () => {
        switch (this.props.gender) {
            case "male":
                gender = "fa fa-mars"
                break;
            case "female":
                gender = "fa fa-venus"
                break;
            default:
                gender = "fa fa-genderless"
        }
        this.setGenderClass();
    }

    setGenderClass = () => {
        this.setState({
            genderIconClass: gender
        })
    }

    setCityImageSrc = (url) => {
        this.setState({ cityImageSrc: url })
    }

    renderPixabay = () => {
        if (this.props.rendered) {
            return <Pixabay
                city={this.props.city}
                country={this.props.country}
                setCityImageSrc={this.setCityImageSrc}
            />
        }
        console.log(this.props.country)
    }

    render() {
        return (

            <div className="suitcase-partial container col-sm-12 col-md-6 col-lg-4">
                <div className="suitcaseCard">
                    <div className="card bg-dark text-white no-shadow">
                        <div className="suitcaseWrapper card-img" onClick={() => { this.props.showQuickViewModal(); this.props.setQuickViewModalIndex(this.props.id) }}>

                            {this.renderPixabay()}
                            <img
                                className="suitcasePhoto img-responsive"
                                src={this.state.cityImageSrc} alt="City Skyline"
                            />
                            <img className="suitcaseFrame img-responsive" src={SuitcaseFrame} alt="Suitcase Frame" />

                        </div>
                        <div className="card-img-overlay">
                            <div className="title-div">
                                <h5 className="card-title suitcase-user">{this.props.userName}, <GenderIcon
                                    genderIconClass={this.state.genderIconClass}
                                /></h5>
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