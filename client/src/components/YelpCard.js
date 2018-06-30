import React, { Component } from 'react';
import "../styles/Yelp.css";
import { log } from 'util';

export default class YelpCard extends Component {


render() {
    return (
        
        <div className="card card-yelp">

            <div className="card-img-wrapper">
                <img className="card-img-top yelp-img" src={this.props.image} alt="Restaurant" />
            </div>
            <div className="card-img-overlay" >
                <div className="row">
                    <div className="offset-8 col-md-4">
                        <p className="card-text text-right yelp-rating">{this.props.rating} ---- {this.props.price}</p>
                    </div>
                    <div className="col-md-12">
                        <h2 className="card-title yelp-title">{this.props.name}</h2>
                    </div>
                    <div className="col-md-12 col-sm-12">
                        <div className="card-text">{this.props.category.join(', ')}</div>
                    </div>
                    <div className="col-md-12">
                        <a className="btn btn-default btn-fab btn-round" href={this.props.website} target="_blank" >
                            <i className="fa fa-window-restore" data-toggle="tooltip" title="Go to website"> </i>
                        </a>
                    </div>
                </div>  
            </div>

        </div>        
    )
}}

