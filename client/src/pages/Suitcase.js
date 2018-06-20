import React, { Component } from 'react';
import Main from "../components/Main";
import Header from "../components/Header";
import suitcaseHandleWhite from "../suitcase-handle-white.png";
import "../styles/Suitcase.css";

export default class Suitcase extends Component {
  render() {
    return (
      <div className="suitcase">
        <Header />
        <Main>
          <div className="page-header header-filter" data-parallax="true" id="background-suitcase"></div>
          <div className="main main-raised">
            <div className="profile-content">

              <div className="container">
                <div className="row">
                  <div className="col-md-6 ml-auto mr-auto">
                    <div className="profile profile-handle">
                      <div className="handle">
                        <img src={suitcaseHandleWhite} alt="WM Handle" className="handle-image" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card card-nav-tabs card-plain">
                  <div className="suitcase-header card-header card-header-default">

                    <div id="suitcase-nav" className="nav-tabs-navigation" data-suitcase_id="{{suitcase.id}}">
                      <div className="nav-tabs-wrapper">
                        <ul className="nav suitcase-nav">
                          <li className="nav-item ">
                            <p className="nav-link" data-user-id="{{suitcase.User.id}}" id="suitcase-user"></p>
                          </li>
                          <li className="nav-item ">
                            <p className="nav-link" id="suitcase-user-gender"></p>
                          </li>
                          <li className="nav-item ">
                            <a className="nav-link" id="suitcase-locale" data-city="" data-admin=""
                              data-country="" href="/search/{{suitcase.Locale.locale_city}}">&nbsp;</a>
                          </li>
                          <li className="nav-item">
                            <p className="nav-link d-inline-block" data-start="{{suitcase.start_date}}" id="suitcase-startDate"></p>-
                  <p className="nav-link d-inline-block" data-end="{{suitcase.end_date}}" id="suitcase-endDate"></p>
                          </li>

                          <li className="nav-item">
                            <p className="nav-link" id="suitcase-travelCategory"></p>
                          </li>

                        </ul>
                        <ul className="nav suitcase-nav">
                          <li className="nav-item ">
                            <p className="nav-link" id="highF"></p>
                          </li>
                          <li className="nav-item ">
                            <p className="nav-link" id="highC"></p>
                          </li>
                          <li className="nav-item ">
                            <p className="nav-link" id="lowF"></p>
                          </li>
                          <li className="nav-item ">
                            <p className="nav-link" id="lowC"></p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                </div>
              </div>


              <div className="row">
                <div className="col-12">
                  <div id="items">

                    <div className="row">
                      <div className="offset-1 col-11">
                        <div className="title row">
                          <span className="badge badge-pill badge-info">Toiletries</span>
                        </div>
                        <div className="row cat-row" id="toiletries">

                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="offset-1 col-11">
                        <div className="title row">
                          <span className="badge badge-pill badge-primary">Clothing</span>
                        </div>
                        <div className="row cat-row" id="clothing">

                        </div>
                      </div>
                    </div>


                    <div className="row">
                      <div className="offset-1 col-11">
                        <div className="title row">
                          <span className="badge badge-pill badge-success">Accessories</span>
                        </div>
                        <div className="row cat-row" id="accessories">

                        </div>
                      </div>
                    </div>


                    <div className="row">
                      <div className="offset-1 col-11">
                        <div className="title row">
                          <span className="badge badge-pill badge-default">Electronics</span>
                        </div>
                        <div className="row cat-row" id="electronics">

                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
              <div className="row">
                <div className="col-6 mx-auto my-3 text-center">
                  <button id="add-items" className="btn btn-primary btn-lg">Add Selected Items To My Suitcase</button>
                </div>
                <div className="col-12 text-center" id="add-more-items-holder">
                  <a className="btn btn-lg btn-primary mt-3 mb-3 px-3 pb-2 pt-3" id="add-more-items" href="/suitcase-start">

                    <p>See Full List of Items To Choose From</p>

                  </a>
                </div>
              </div>
            </div>
          </div>
        </Main>
      </div>
    )
  }
}
