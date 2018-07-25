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
                  <h3 className="description">The "Must" have packing app.</h3>
                  <h4 className="description">Because we always ask everyone what to pack anyway.</h4>
                  <h5 className="pitch">In the world of travel, there are apps to assist with various parts of the overall experience, but no shared, social space for those with a true wanderlust. Wander-Must is a social network for world travelers looking for the unexpected, but averse to unwelcome surprises.</h5>
                </div>
              </div>
            </div> {/* ends container */}
          </div> {/* ends background-home */}
          
          <div className="main-raised">
            <div className="container">
              
              <div className="section text-center">
                <div className="features">
                <h2 className="title">Features</h2>  
                  <div className="row">
                    <div className="col-md-4">
                      <div className="info">
                        <div className="icon icon-info">
                          <i className="material-icons">face</i>
                        </div>
                        <h4 className="info-title">Free Profile</h4>
                        <p>Share your packing list with a whole social network, and figure out the best things to pack for your next get away. This is a community of travelers!</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="info">
                        <div className="icon icon-success">
                          <i className="material-icons">event</i>
                        </div>
                        <h4 className="info-title">Set the date, Get the weather!</h4>
                        <p>You get to set your trip details, and we help you find the rest! From high/low temperature averages to most packed items, we want to give you all the info. </p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="info">
                        <div className="icon icon-danger">
                          <i className="material-icons">loyalty</i>
                        </div>
                        <h4 className="info-title">Know the Tricks</h4>
                        <p>With the ability to leave notes on your packing list, you will know what other people thought the must-haves are. You can just focus on the trip, and not hunting for the items you forgot.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> {/* ends section */}

              <div className="section text-center">
                <div className="intro-steps">
                  <h2 className="title">Getting Started</h2>  
                  <div className="row">
                    <h4>Knowing what to pack becomes easy with the following steps:</h4>
                      <ol>
                        <li>Sign up/Log in - create a unique username and customize your profile.</li>
                        <li>Choose a destination, your travel dates, and the type of travel (Business, Leisure, Adventure, Vacation) and create a new suitcase.</li>
                        <li>
                          <ul>
                            <li>If another user has already visited your destination, explore their experiences and add items to your suitcase.</li>
                            <li>If you are the first to visit a destination, pick and choose what you may need from a list of 100 items and add them to your suitcase.</li>
                          </ul>
                        </li>
                        <li>Update your suitcase as needed, adding and deleting items, writing your travel blog, changing the photo for your suitcase, and adjusting item amounts within your suitcase.</li>
                      </ol>
                  </div>
                  <div className="row">
                    <Link className="btn btn-lg btn-primary button-center" to="/signup">
                      <span>
                        <p>SignUp for</p>
                        <h4 className="wandermust-font">Wander-Must</h4>
                      </span>
                    </Link>
                  </div>
                </div>
              </div> {/* ends section */}

              <div className="section text-center">
                <div className="why">
                <h2 className="title">Why This App?</h2>  
                  <div className="row">
                    <p>World travelers generally spend several hours scouring the internet for information on what they should or shouldn't take on a trip to a particular part of the world. Information can be difficult to sift through, and the information that is available lacks consistency, context, and any sort of personal experience to lend it credence.</p> 
                    <p>Wander-Must serves as a user-friendly exploration of other users' personal experiences, organized in a way that makes planning for trips painless and fun. Each trip contains user details and personalization that contextualize these experiences, leading to a more accurate understanding of what to pack for a specific trip.</p>
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
                            <p className="card-description">I can't say enough about this app. I knew to pack an umbrella for Seattle, but I would never have thought to bring good shoes for trucking through the rainy streets. Some times the no brainers are the ones you forget first!</p>
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
                    <ul>
                      <div className="col-5">
                        <li>Persistent search bar to find cities and users.</li>
                        <li>Updating suitcase dates.</li>
                        <li>Multiple destination suitcases.</li>
                        <li>User creation of new items not already in database.</li>
                        <li>Password recovery and reset.</li>
                      </div>
                      <div className="col-7">
                        <li>Social media signup/login.</li>
                        <li>Printable packing lists.</li>
                        <li>Create space for sites like Expedia to show airfare/hotel prices</li>
                        <li>Real-time social feed for new suitcases and update to suitcases.</li>
                        <li>The abiity to follow other users.</li>
                        <li>Integration with other social media channels.</li>
                      </div>
                    </ul>
                  </div>
                </div>
              </div> {/* ends section */}

            </div> {/* ends container */}
          </div> {/* ends main-raised */}
        </Main>

        {this.props.renderNewSuitcaseModal()}

        <Footer />

      </div>
    )
  }
}
