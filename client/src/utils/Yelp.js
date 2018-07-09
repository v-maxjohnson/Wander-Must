import React, {
  Component
} from 'react';
import YelpCarousel from '../components/YelpCarousel';
import axios from "axios";
import "../styles/Yelp.css";
import { Col, Form, FormGroup, Label, Input } from 'reactstrap';

let location;

export default class Yelp extends Component {

  state = {
    // these are user inputs
    sort_by: "",
    price: "",
    radiusMiles: 15,
    yelpData: [],
    term: ""
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
      term: this.state.term || 'restaurants',
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
            if (output.length < 15 && !item.is_closed) {
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

  handleTermChange = (event) => {
    this.setState({
      term: event.target.value
    });
  };
  

  setTerm = (event) =>{
    event.preventDefault();
    
    this.makeYelpCall();
  }

  render() {
    return (
      <div className="yelp-wrapper">
      
        <YelpCarousel

          yelpResults={this.state.yelpData}

        />
        <br/>
        <Form onSubmit={this.setTerm}>
          <FormGroup row>
            <Col sm={1}></Col>
            <Label className="dark-text" for="exampleEmail" sm={4}>What are you looking for?</Label>
            <Col sm={5}>
              <Input type="text" name="term" placeholder="ex. Restaurants/Activities/Mexican Food" value={this.state.term} onChange={this.handleTermChange}/>
            </Col>
            <Col sm={2}>
              <button data-category="YelpInput" className="all btn btn-default btn-sm btn-fab btn-round" type="submit">
                {/* <a className="nav-link" data-toggle="tooltip" title="Yelp Search" data-placement="middle" data-original-title="Confirm new yelp search"> */}
                  <i className="fa fa-check-circle-o" data-toggle="tooltip" title="Confirm new yelp search"> </i>
                 
              </button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

