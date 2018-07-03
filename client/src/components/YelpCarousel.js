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
      slidesToShow: 3,
      slidesToScroll: 2
    };
    return (
      <div>
        <h3 className="text-center"> Want more to do in the city?</h3>

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
          {/* </div> */}
        </Slider>
      </div>
    );
  }
}