import React, {
  Component
} from 'react';
import YelpCarousel from '../components/YelpCarousel';
import axios from "axios";
import "../styles/Yelp.css";

let location;

export default class Yelp extends Component {

  state = {
    // these are user inputs
    sort_by: "",
    price: "",
    radiusMiles: 5,
    yelpData: []
  }

  componentDidMount() {
    this.makeYelpCall();
  }

  makeYelpCall = () => {
    if (this.state.radiusMiles >= 25) {
      this.setState({
        radiusMiles: 25
      });
    }

    var radiusMeters = this.state.radiusMiles * 1600;

    if (this.props.country === "usa") {
      location = this.props.city + ", " + this.props.admin;
    } else {
      location = this.props.city + ", " + this.props.admin + ", " + this.props.country;
    }


    let params = [{
      term: 'restaurants',
      //   location: this.props.city + "+" + this.props.country,
      location: location,
      radius: radiusMeters,
      sort_by: 'rating',
      price: '1'
    }];

    axios({
      method: "post",
      url: "/yelp",
      data: params
    })
      .then((response) => {
        let output = [];
        if (response.data.businesses) {
          response.data.businesses.forEach(item => {
            if (output.length < 10 && !item.is_closed) {
              output.push({
                name: item.name,
                rating: item.rating,
                thumbnail: item.image_url,
                href: item.url,
                categories: item.categories.map(category => category.title),
                priceRating: item.price ? item.price : "No price available"
              });
            }
          })
          this.setState({
            yelpData: output
          })
        }
      });
  }

  render() {
    return (
      <div className="yelp-wrapper">
        
        <YelpCarousel

          yelpResults={this.state.yelpData}

        />
      </div>
    )
  }
}

/* <div className="dd-wrapper">
  <div className="dd-header">
    <div className="dd-header-title"></div>
  </div>
  <ul className="dd-list">
    <li className="dd-list-item">5</li>
    <li className="dd-list-item">10</li>
    <li className="dd-list-item">15</li>
  </ul>
</div> */