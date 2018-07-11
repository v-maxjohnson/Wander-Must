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
        this.setState({ rendered: true });
        this.makePixabayCall();
    }

    makePixabayCall = () => {
        city = this.props.city;
        country = this.props.country;
        var pixaCity = city.replace(/\s_/g, '+');
        var pixaCountry = country.replace(/\s_/g, '+');
        var queryURL = "https://pixabay.com/api/?key=" + authKey + "&q=" + pixaCity + "+" + pixaCountry + "+skyline&image_type=photo";
        let url;
        console.log("pixabay is running")

        axios.get(queryURL)
            .then((response) => {
                if (this.state.rendered && response.data.hits.length) {
                    url = response.data.hits[0].webformatURL;
                    this.props.setCityImageSrc(url);
                } else {
                    url = "https://res.cloudinary.com/wandermust/image/upload/v1531079286/user_image/suitcaseBlack.png";
                    this.props.setCityImageSrc(url);
                }
            })
    }

    render() {
        return (
            <div className="pixabay">
                {this.props.children}
            </div>
        )
    }
}