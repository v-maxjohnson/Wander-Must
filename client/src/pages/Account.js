import React, { Component } from 'react';
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Account.css";
import gql from "graphql-tag";
import axios from 'axios';
import ApolloClient from 'apollo-boost';
import { Image } from 'cloudinary-react';

const GET_USER_QUERY = gql`
query getUser( $id: String! ){
  getUser(id: $id) {
    id
    username
    gender
    user_image
    email
  }
  }`;

const client = new ApolloClient();

export default class Account extends Component {
  state = {
    userData: {
      id: "",
      username: "",
      gender: "",
      user_image: ""
    },
    rendered: false,
    number: "2"
  }

  componentDidMount() {

    client.query({
      query: GET_USER_QUERY,
      variables: { id: this.state.number }
    }).then(result => {
      this.setState({ userData: result.data.getUser, rendered: true });
      console.log(this.state.userData);
    })

  }

  handleImageChange = (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "poabwcdf")
    console.log(formData.get("file"));

    if(this.state.rendered) {
      axios({
        method: "POST",
        url: "https://api.cloudinary.com/v1_1/dorxotpsj/upload",
        data: formData 
      })
      .then(res => {
        this.setState({
          userData: {
            id: this.state.userData.id,
            username: this.state.userData.username,
            gender: this.state.userData.gender,
            user_image: res.data.url
          }
        });
      })
    }
  }

  render() {
    return (
      <div className="account profile-page sidebar-collapse">
        <Header />
          <Main>
          <div className="page-header header-filter" id="background-account" data-parallax="true"></div>
          <div className="main main-raised">
            <div className="profile-content">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 ml-auto mr-auto">
                    <div className="profile">
                      <div className="avatar">
                        <img style={{"border-radius": "50%"}} src={this.state.userData.user_image}  alt="Avatar" className="img-fluid" />
                      </div>
                      <div className="name">
                        <h3 id="profile-user-name" className="title">{this.state.userData.username} </h3>
                      </div>
                        <input accepts=".jpg" type="file" onChange={this.handleImageChange} />
                    </div>
                  </div>
                </div>
                <div className="row">

                <div className="card card-nav-tabs card-plain">
    <div className="suitcase-header card-header card-header-default">

        <div id="suitcase-nav" className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
                <ul className="nav suitcase-nav">
                    <li className="nav-item ">
                        <p className="nav-link" id="suitcase-user">{this.state.userData.username}</p>
                    </li>
                    <li className="nav-item ">
                        <p className="nav-link" id="suitcase-user-gender">{this.state.userData.gender}</p>
                    </li>
                    <li className="nav-item ">
                        <p className="nav-link" id="suitcase-user-email">{this.state.userData.email}</p>
                    </li>

                </ul>
            </div>
        </div>
    </div>

</div>
                 

                </div>
              </div>
            </div>
          </div>
        </Main>
        <Footer />
      </div>
    )
  }
}
