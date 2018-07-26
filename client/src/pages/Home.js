import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Home.css";

export default class Home extends Component {

  state = {
    loggedInUserIdNumber: localStorage.getItem("logged_in_user_id")
  }

  render() {
    return (
      <div className="home profile-page sidebar-collapse">
        <Header
          showNewSuitcaseModal={this.props.showNewSuitcaseModal}
          loggedInUserIdNumber={this.state.loggedInUserIdNumber}
        />

        <Main>
          <div id="background-home" className="page-header header-filter" data-parallax="true">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="wandermust ml2">Wander-Must</h1>
                  <h3 className="description">The "Must" have packing app -- because you were going to ask what to pack anyway.</h3>
                  
                </div>
              </div>
            </div> {/* ends container */}
          </div> {/* ends background-home */}

          <div className="main-raised">
            <div className="container">
              <div className="section text-center">
                <div className="features">
                  <div>
                    <h5 className="wandermust-font">We share our travel. You share your travel. Why is no one sharing their packing list?</h5>
                  </div>
                  <h2 className="title">Getting Started</h2>  
                  <div className="row">
                    <div className="col-md-4">
                      <div className="info">
                        <div className="icon icon-info">
                          <i className="material-icons">face</i>
                        </div>
                        <h4 className="info-title">Step 1 - Signup</h4>
                        <p>Sign up/Log in - create a unique username and customize your profile. You will be able to share your trips right away, and head to account settings to change your avatar.</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="info">
                        <div className="icon icon-success">
                          <i className="material-icons">event</i>
                        </div>
                        <h4 className="info-title">Step 2 - Start "packing"!</h4>
                        <p>Choose a destination, your travel dates, and the type of travel and create a new suitcase. If someone else has been their, check out their packing list. If no one has been there, help us make the 1st suitcase. </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="info">
                        <div className="icon icon-danger">
                          <i className="material-icons">loyalty</i>
                        </div>
                        <h4 className="info-title">Step 3 - Update your trips</h4>
                        <p>With the ability to leave notes on your suitcase, you will know what other people thought the must-haves are. You can just focus on the trip, and not hunting for items you forgot. Update your suitcase to help others pack too.</p>
                      </div>
                    </div>
                  </div>
                  <div className="row text-center">
                    <Link className="btn btn-lg btn-primary button-center" to="/signup">
                      <span>
                        <p>SignUp for</p>
                        <h4 className="wandermust-capitalize">Wander-Must</h4>
                      </span>
                    </Link>
                  </div>
                </div>
              </div> {/* ends section */}

              <div className="section text-center">
                <div className="features">
                  <h2 className="title">Why This App?</h2>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="info">
                        <div className="icon icon-info">
                          <i className="material-icons">query_builder</i>
                        </div>
                        <h4 className="info-title">Time Efficient</h4>
                        <p>Don&apos;t spend hours scouring the internet trying to figure out what to pack. Learn from your fellow travelers, and focus on the real priorities.</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="info">
                        <div className="icon icon-success">
                          <i className="material-icons">fingerprint</i>
                        </div>
                        <h4 className="info-title">Create a Community</h4>
                        <p>We travel for so many reasons, but one of the most important is connecting with people. <span className="wandermust-capitalize"> Wander-Must</span> lets you start connecting now.</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="info">
                        <div className="icon icon-danger">
                          <i className="material-icons">search</i>
                        </div>
                        <h4 className="info-title">Discover New Destinations</h4>
                        <p>Don&apos;t know where you want to go on your next trip? Check out other users&apos; experiences to help you decide where your next great adventure will be.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> {/* ends section */}


              <div className="section text-center">
                <h2 className="title">User Thoughts</h2>
                <div className="team">
                  <div className="row">
                    <div className="col-md-4">
                      <div className="team-player">
                        <div className="card card-plain">
                          <div className="col-md-6 ml-auto mr-auto">
                            <img src="/assets/img/faces/card-profile6-square.jpg" alt="Face Thumbnail" className="img-raised rounded-circle img-fluid" />
                          </div>
                          <h4 className="card-title">Mimi
                          <br />
                            <small className="card-description text-muted">Model</small>
                          </h4>
                          <div className="card-body">
                            <p className="card-description">I can&apos;t say enough about this app. I knew to pack an umbrella for Seattle, but I would never have thought to bring good shoes for trucking through the rainy streets. Some times the no brainers are the ones you forget first!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="team-player">
                        <div className="card card-plain">
                          <div className="col-md-6 ml-auto mr-auto">
                            <img src="/assets/img/faces/christian.jpg" alt="Face Thumbnail" className="img-raised rounded-circle img-fluid" />
                          </div>
                          <h4 className="card-title">Christian
                          <br />
                            <small className="card-description text-muted">Designer</small>
                          </h4>
                          <div className="card-body">
                            <p className="card-description">Being a designer requires looking right for every situation. This app helps me style my packing list for the area.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="team-player">
                        <div className="card card-plain">
                          <div className="col-md-6 ml-auto mr-auto">
                            <img src="/assets/img/faces/kendall.jpg" alt="Face Thumbnail" className="img-raised rounded-circle img-fluid" />
                          </div>
                          <h4 className="card-title">Mandy
                          <br />
                            <small className="card-description text-muted">World Traveler</small>
                          </h4>
                          <div className="card-body">
                            <p className="card-description">I love traveling! This app is great because I can make specific lists for every location I want to go to AND get the weather! This app rocks!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> {/* ends row */}
                </div> {/* ends team */}
              </div> {/* ends section */}

              <div className="section text-center">
                <div className="future">
                  <h2 className="title">Future Plans for Wander-Must</h2>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <ul>
                        <li>Persistent search bar to find cities and users.</li>
                        <li>Updating suitcase dates.</li>
                        <li>Multiple destination suitcases.</li>
                        <li>User creation of new items not already in database.</li>
                        <li>Password recovery and reset.</li>
                        <li>Social media signup/login.</li>
                      </ul>
                    </div>
                    <div className="col-12 col-md-6">
                      <ul>
                        <li>Printable packing lists.</li>
                        <li>Create space for sites like Expedia to show airfare/hotel prices</li>
                        <li>Real-time social feed for new suitcases and update to suitcases.</li>
                        <li>The abiity to follow other users.</li>
                        <li>Integration with other social media channels.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div> {/* ends section */}

            </div> {/* ends container */}
          </div> {/* ends main-raised */}
        </Main>

        {this.props.renderNewSuitcaseModal()}

        <Footer />

      </div >
    )
  }
}
