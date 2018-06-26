import React, {
    Component
} from 'react';
import axios from "axios";

const authKey = "8978514-366287692940ef0d26d86e99b";
var city;
var country;

export default class Wunderground extends Component {

    state = {
        rendered: false
    }


    componentDidMount() {
        this.setState({rendered: true})
        this.makePixabayAPICall();
    }

    makePixabayCall = () => {
        if (this.state.rendered) {
        city = this.props.city;
        country = this.props.country;
        var pixaCity = city.replace(/\s_/g, '+');
        var pixaCountry = country.replace(/\s_/g, '+');
        var queryURL = "https://pixabay.com/api/?key=" + authKey + "&q=" + pixaCity + "+" + pixaCountry + "+skyline&image_type=photo";


        axios.get(queryURL)
            .then(function (response) {
                if (response) {
                    this.props.setCityImgSrc(response.hits[0].webformatURL)
                } else {

                    // $(this).attr("src", "/assets/img/bg7.jpg");
                }
            })

            // .then(function (response) {
            //     if (response.hits[0].webformatURL) {
            //         {this.props.setCityImgSrc(url)}
            //     } else {

            //         // $(this).attr("src", "/assets/img/bg7.jpg");
            //     }
            // })
    }
    }


render() {
    return (
        <div className="pixabay">
            {this.props.children}
        </div>
    )
}

}

