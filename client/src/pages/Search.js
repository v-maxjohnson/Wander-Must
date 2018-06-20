import React, { Component } from 'react';
import Main from "../components/Main";
import Header from "../components/Header";
import "../styles/Search.css";

export default class Search extends Component {
  render() {
    return (
      <div className="search">
        <Header />
        <Main>
          <div className="page-header header-filter" data-parallax="true" id="background-search"></div>
          <div className="main main-raised">
            <div className="profile-content">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-lg-12 ml-auto mr-auto">
                    <div className="profile">

                      <div className="city-name">
                        <p>Here are some suitcases for
                <span className="locale-city"></span>. Click on a suitcase and start adding items to yours!</p>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">

                </div>
              </div>
            </div>
          </div>
        </Main>
      </div>
    )
  }
}
