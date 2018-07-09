import React, { Component } from 'react';
// import axios from 'axios';

export default class Cloudinary extends Component {
	
	componentDidMount() {
    // get url from database here instead of just the sample
    let url = "http://res.cloudinary.com/dorxotpsj/image/upload/v1529025334/sample.jpg"
    this.props.setCityImageSrc(url);
	}	

  render() {
    return (
      <div className="cloudinary">
        { this.props.children }
      </div>
    )
  }
}
