import React, { Component } from 'react';
import "../styles/Yelp.css";

export default class YelpCard extends Component {
  render() {
    return (
        <div className="col-2">
        <div className="card card-yelp">
            
            <img className="card-img-top" src={this.props.image} alt="Restaurant"/>
            <div className="card-img-overlay">
            <p className="card-text text-white">{this.props.rating} ---- {this.props.price}</p>
            <h4 className="card-title card-title-wrapper text-white">{this.props.name}</h4>
            </div>
            <div className="card-body">
                <ul className="card-text">{this.props.category.map ((child, i) => <li key={i}>{child}</li>)}</ul>
                <a className="btn btn-primary" href={this.props.website} >Go there</a>
            </div>
        </div>
        </div>
        
    )
  }
}