import React, { Component } from 'react';
import Slider from "react-slick";
import '../styles/Yelp.css'
import YelpCard from './YelpCard.js'


export default class YelpCarousel extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2
    };
    return (
      <div>
        <h2> Single Item</h2>

        <Slider {...settings}>
        {this.props.yelpResults.map((yelp, i) => (
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
        </Slider>
      </div>
    );
  }
}