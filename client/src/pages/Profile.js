import React, { Component } from 'react';
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SuitcaseCard from "../components/SuitcaseCard"
import SuitcaseFrame from "../images/suitcaseFrame.png"
import "../styles/Profile.css";
import gql from "graphql-tag";
import ApolloClient from 'apollo-boost';

const GET_USER_QUERY = gql`
query getUser( $id: String! ){
  getUser(id: $id) {
    id
    username
    gender
    user_image
    Suitcases {
      id
      start_date
      end_date
      travel_category
      notes
      Locale {
        id
        locale_city
        locale_admin
        locale_country
      }
    }
  }
}`;

const client = new ApolloClient();

export default class Profile extends Component {
  state = {
    userData: {
      id: "",
      username: "",
      gender: "",
      user_image: "",
      Suitcases: []
    },
    number: "2"
  }

  componentDidMount() {

    client.query({
      query: GET_USER_QUERY,
      variables: { id: this.state.number }
    }).then(result => {
      this.setState({ userData: result.data.getUser });
      console.log(this.state.userData);
    })

  }

  render() {
    return (
      <div className="profile profile-page sidebar-collapse">
        <Header />
        <Main>
          <div className="page-header header-filter" id="background-profile" data-parallax="true"></div>
          <div className="main main-raised">
            <div className="profile-content">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 ml-auto mr-auto">
                    <div className="profile">
                      <div className="avatar">
                        <img src={this.state.userData.user_image} alt="Avatar" className="img-fluid" />
                      </div>
                      <div className="name">
                        <h3 id="profile-user-name" className="title">{this.state.userData.username}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {this.state.userData.Suitcases.map((suitcase) => (
                    <SuitcaseCard
                      key={suitcase.id}
                      id={suitcase.id}
                      city={suitcase.Locale.locale_city}
                      localeAdmin={suitcase.Locale.locale_admin}
                      country={suitcase.Locale.locale_country}
                      src={suitcase.Locale.locale_image}
                      startDate={suitcase.start_date}
                      endDate={suitcase.end_date}
                      category={suitcase.travel_category}
                    />
                  ))}

                  <div className="container col-sm-12 col-md-6 col-lg-4">
                    <div className="suitcaseCard suitcase-input" id="blank-suitcase" data-toggle="modal" data-target="#suitcase-modal">
                      <div className="card add-card text-white no-shadow">
                        <div className="suitcaseWrapper card-img">
                          <img className="suitcaseFrame img-responsive" src={SuitcaseFrame} alt="Suitcase Frame" />
                        </div>
                        <div className="card-img-overlay">
                          <i className="fa fa-plus plus-icon"></i>
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

