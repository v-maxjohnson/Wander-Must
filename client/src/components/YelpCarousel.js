import React, { Component } from 'react';
import Slider from "react-slick";
import '../styles/Yelp.css'
import YelpCard from './YelpCard.js'


export default class YelpCarousel extends Component {

  renderCarouselHeading = () => {
    if (this.props.yelpResults.length) {
      return (
        <h3 className="text-center"> Want more to do in the city?</h3>
      )
    }
  }

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

        {this.renderCarouselHeading()}

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