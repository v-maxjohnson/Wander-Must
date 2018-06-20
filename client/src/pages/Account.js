import React, { Component } from 'react';
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Account.css";

export default class Account extends Component {
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
                        <img src="" alt="Avatar" className="img-fluid" />
                      </div>
                      <div className="name">
                        <h3 id="profile-user-name" className="title"> </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">

                  <div className="container col-sm-12 col-md-6 col-lg-4">
                    Adjust your account settings:
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
