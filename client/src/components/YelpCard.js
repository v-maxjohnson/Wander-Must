import React, { Component } from 'react';
import "../styles/Yelp.css";


export default class YelpCard extends Component {


render() {
    return (
        
        <div className="card card-yelp">

            <div className="card-img-wrapper">
                <img className="card-img-top yelp-img" src={this.props.image} alt="Restaurant" />
            </div>

            <div className="card-img-overlay">
                <a href={this.props.website} target="_blank" >
                <div className="row">

                    <div className="col-md-12">
                        <p className="card-text text-right yelp-rating">{this.props.rating} ---- {this.props.price}</p>
                    </div>
                    <div className="col-md-12">
                        <h2 className="card-title yelp-title text-truncate">{this.props.name}</h2>
                    </div>
                    <div className="col-md-12 col-sm-12">
                        <div className="card-text food-categories text-dark text-truncate">{this.props.category.join(', ')}</div>
                    </div>

                </div>
                </a>  
            </div>

        </div>        
    )
}}

