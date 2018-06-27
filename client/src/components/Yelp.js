import React, { Component } from 'react';
// import AliceCarousel from 'react-alice-carousel';
import YelpData from "../scratch2.json"
// import "../styles/Yelp.css";
import YelpCard from './YelpCard';

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

            <div className="row card-group">
            {this.state.data.map((yelp, i) => (
                <YelpCard
                    key={i}
                    image={yelp.thumbnail}
                    name={yelp.name}
                    rating={yelp.rating}
                    category={yelp.categories}
                    price={yelp.priceRating}
                    website={yelp.href}
                />
            ))}
            </div>

          
      )
    }
}