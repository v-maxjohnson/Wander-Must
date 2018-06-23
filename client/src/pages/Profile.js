import React, { Component } from 'react';
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SuitcaseFrame from "../images/suitcaseFrame.png"
import "../styles/Profile.css";

export default class Profile extends Component {
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
