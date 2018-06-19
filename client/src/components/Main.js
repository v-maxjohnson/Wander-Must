import React, { Component } from 'react';
import "../styles/Main.css";

export default class Main extends Component {
  render() {
    return (
      <div className="main">
        <div id="background-home" className="page-header header-filter" data-parallax="true">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="wandermust ml2">Wander-Must</h1>
                <h4>The "Must" have packing app.</h4>

              </div>
            </div>
          </div>
        </div>
        <div className="main main-raised">
          <div className="container">
            <div className="section text-center">
              <div className="row">
                <div className="col-md-8 ml-auto mr-auto">
                  <h2 className="title wandermust-font">Wander-Must</h2>
                  <h5 className="description">Because we always ask everyone what to pack anyway.</h5>
                </div>
              </div>
              <div className="features">
                <div className="row">
                  <div className="col-md-4">
                    <div className="info">
                      <div className="icon icon-info">
                        <i className="material-icons">face</i>
                      </div>
                      <h4 className="info-title">Free Profile</h4>

                      <p>Share your packing list with a whole social network, and figure out the best things to pack for your next get
                away. This is a community of travelers!</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info">
                      <div className="icon icon-success">
                        <i className="material-icons">event</i>
                      </div>
                      <h4 className="info-title">Set the date, Get the weather!</h4>
                      <p>You get to set your trip details, and we help you find the rest! From high/low temperature averages to most
                packed items, we want to give you all the info. </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="info">
                      <div className="icon icon-danger">
                        <i className="material-icons">loyalty</i>
                      </div>
                      <h4 className="info-title">Know the Tricks</h4>
                      <p>With the ability to leave notes on your packing list, you will know what other people thought the must-haves
                are. You can just focus on the trip, and not hunting for the items you forgot.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section text-center">
              <h2 className="title">Our Reviews</h2>
              <div className="team">
                <div className="row">
                  <div className="col-md-4">
                    <div className="team-player">
                      <div className="card card-plain">
                        <div className="col-md-6 ml-auto mr-auto">
                          <img src="/assets/img/faces/card-profile6-square.jpg" alt="Thumbnail Image" className="img-raised rounded-circle img-fluid" />
                        </div>
                        <h4 className="card-title">Gigi
                        <br />
                          <small className="card-description text-muted">Model</small>
                        </h4>
                        <div className="card-body">
                          <p className="card-description">I can't say enough about this app. I knew to pack an umbrella for Seattle, but I would never have thought
                            to bring good shoes for trucking through the rainy streets. Some times the no brainers are the ones you
                    forget first!</p>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="team-player">
                      <div className="card card-plain">
                        <div className="col-md-6 ml-auto mr-auto">
                          <img src="/assets/img/faces/christian.jpg" alt="Thumbnail Image" className="img-raised rounded-circle img-fluid" />
                        </div>
                        <h4 className="card-title">Christian Louboutin
                  <br />
                          <small className="card-description text-muted">Designer</small>
                        </h4>
                        <div className="card-body">
                          <p className="card-description">Being a designer requires looking right for every situation. This app helps me style my packing list for
                    the area.</p>
                        </div>

                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="team-player">
                      <div className="card card-plain">
                        <div className="col-md-6 ml-auto mr-auto">
                          <img src="/assets/img/faces/kendall.jpg" alt="Thumbnail Image" className="img-raised rounded-circle img-fluid" />
                        </div>
                        <h4 className="card-title">Kendall Jenner
                  <br />
                          <small className="card-description text-muted">Reality TV "Star"</small>
                        </h4>
                        <div className="card-body">
                          <p className="card-description">I'm just one here so everyone can pack like me. It's my favorite thing do for charity.</p>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <a className="btn btn-lg btn-primary mt-3 mx-auto px-3 py-2" href="/signup">
                  <span>
                    <p>SignUp for</p>
                    <h4 className="wandermust-font text-capitalize">Wander-Must</h4>
                  </span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
        )
  }
}
