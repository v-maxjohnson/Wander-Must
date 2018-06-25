import React, {
    Component
} from 'react';
import axios from "axios";

const authKey = "8978514-366287692940ef0d26d86e99b";
var city = this.props.city;
var country = this.props.country;
var pixaCity = city.replace(/\s_/g, '+');
var pixaCountry = country.replace(/\s_/g, '+');
var queryURL = "https://pixabay.com/api/?key=" + authKey + "&q=" + pixaCity + "+" + pixaCountry + "+skyline&image_type=photo";

export default class Wunderground extends Component {

    makePixabayCall = () => {
        axios.get(queryURL)
            .then(function (response) {
                if (response.hits[0].webformatURL) {
                    // need to figure out what to replace this jQuery DOM stuff w for react 
                    // $(this).attr("src", response.hits[0].webformatURL);
                } else {

                    // $(this).attr("src", "/assets/img/bg7.jpg");
                }
            })
    }
}