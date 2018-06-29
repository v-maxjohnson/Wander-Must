import React, { Component } from 'react';
import "../styles/Yelp.css";

export default class YelpCard extends Component {
  render() {
    return (
        <div className="mb-2">
        <div className="card card-yelp">
            <div className="card-img-wrapper">
                <img className="card-img-top" src={this.props.image} alt="Restaurant"/>
                <div className="card-img-overlay">
                <p className="card-text text-white">{this.props.rating} ---- {this.props.price}</p>
                <h4 className="card-title card-title-wrapper text-white">{this.props.name}</h4>
                </div>
            </div>
            <div className="card-body">
                <div className="card-text">{this.props.category.map ((child, i) => <p key={i}>{child}</p>)}</div>
                <a className="btn btn-primary" href={this.props.website} >
                    <i className="fa fa-window-restore" data-toggle="tooltip" title="Go to website"> </i>
                </a>
            </div>
        </div>
        </div>
        
    )
  }
}

