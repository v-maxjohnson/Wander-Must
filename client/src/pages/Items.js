import React, { Component } from 'react';
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Items.css";
import "../styles/Suitcase.css";

export default class Items extends Component {
  render() {
    return (
      <div className="items profile-page sidebar-collapse">
        <Header />
        <Main>
          <div className="page-header header-filter" data-parallax="true" id="background-items"></div>
          <div className="main main-raised">
            <div className="profile-content">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-lg-12 ml-auto mr-auto">
                    <div className="profile">

                    </div>
                  </div>
                </div>
                <div className="row text-center new-suitcase">
                  <h2 className="wanderlust text-center">You are a true EXPLORER!</h2>
                  <h3 className="text-center">Scroll down and add more items to your packing list.</h3>
                  <img className="img-fluid animals" src="/assets/img/faces/animals.png" alt="animals" />
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-12">
                <div id="items">

                  <div className="row">
                    <div className="offset-1 col-11">
                      <div className="title row">
                        <div>
                          <span className="badge badge-pill badge-info">Toiletries</span>
                        </div>
                        <div>
                          <button data-category="toiletries" className="all btn btn-primary btn-sm ml-3">Select all</button>
                        </div>
                      </div>
                      <div className="row cat-row" id="toiletries">

                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="offset-1 col-11">
                      <div className="title row">
                        <div>
                          <span className="badge badge-pill badge-info">Clothing</span>
                        </div>
                        <div>
                          <button data-category="clothing" className="all btn btn-primary btn-sm ml-3">Select all</button>
                        </div>
                      </div>
                      <div className="row cat-row" id="clothing">

                      </div>
                    </div>
                  </div>


                  <div className="row">
                    <div className="offset-1 col-11">
                      <div className="title row">
                        <div>
                          <span className="badge badge-pill badge-info">Accessories</span>
                        </div>
                        <div>
                          <button data-category="accessories" className="all btn btn-primary btn-sm ml-3">Select all</button>
                        </div>
                      </div>
                      <div className="row cat-row" id="accessories">

                      </div>
                    </div>
                  </div>


                  <div className="row">
                    <div className="offset-1 col-11">
                      <div className="title row">
                        <div>
                          <span className="badge badge-pill badge-info">Electronics</span>
                        </div>
                        <div>
                          <button data-category="electronics" className="all btn btn-primary btn-sm ml-3">Select all</button>
                        </div>
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
            </div>
          </div>

        </Main>
        <Footer />
      </div >
    )
  }
}
