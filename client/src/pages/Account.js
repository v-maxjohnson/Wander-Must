import React, { Component } from 'react';
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewSuitcaseModal from "../components/NewSuitcaseModal";
import "../styles/Account.css";
import gql from "graphql-tag";
import ApolloClient from 'apollo-boost';

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
    openNewSuitcaseModal: false,
    number: "16"
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

  showNewSuitcaseModal = () => {
    this.setState({ openNewSuitcaseModal: true });
  }

  resetNewSuitcaseModal = () => {
    this.setState({ openNewSuitcaseModal: false });
  }

  renderNewSuitcaseModal = () => {
    if (this.state.openNewSuitcaseModal) {
      return <NewSuitcaseModal
        resetNewSuitcaseModal={this.resetNewSuitcaseModal}
      />
    }
  }

  render() {
    return (
      <div className="account profile-page sidebar-collapse">
        <Header
          showNewSuitcaseModal={this.showNewSuitcaseModal}
        />
        <Main>
          <div className="page-header header-filter" id="background-account" data-parallax="true"></div>
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
                        <h3 id="profile-user-name" className="title">{this.state.userData.username} </h3>
                      </div>
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
        {this.renderNewSuitcaseModal()}
        <Footer />
      </div>
    )
  }
}