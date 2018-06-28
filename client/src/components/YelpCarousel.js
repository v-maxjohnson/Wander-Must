import React from "react";
import Slider from "react-slick";
import YelpCard from './YelpCard';

export default class YelpCarousel extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 2
    };
    return (
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

    );
  }
} 