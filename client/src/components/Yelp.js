import React, { Component } from 'react';
// import AliceCarousel from 'react-alice-carousel';
import YelpData from "../scratch2.json"
import "../styles/Yelp.css";

import YelpCarousel from './YelpCarousel';

export default class Yelp extends Component {
    // constructor (props) {
    //     super(props);
    //     this.state = {
    //       data : YelpData
    //     }
    // }

    state = {data: YelpData}

    componentDidMount() {
        // GraphQL querie here to get data for this specific profile
    }

    render() {
      return (
          
            <YelpCarousel

                yelpResults={this.state.data}

            />

          
      )
    }
}