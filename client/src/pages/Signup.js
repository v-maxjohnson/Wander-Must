import React, { Component } from 'react';
import SignupCard from "../components/SignupCard";
import Navibar from "../components/Navbar";
import "../styles/Signup.css";

export default class Signup extends Component {
  render() {
    return (
      <div className="signup">

        <Navibar />
       
          <div className="page-header header-filter" filter-color="purple" id="background-signup">
            <div className="container">
              <div className="section section-signup page-header">
                <h1 className="ml4">
                  <span className="letters letters-1">Ready</span>
                  <span className="letters letters-2">Set</span>
                  <span className="wandermust letters letters-3">Wander-Must</span>
                </h1>

                <SignupCard />

              </div> {/* ends section-signup */}
            </div> {/* ends container */}
          </div> {/* ends header */}
        
      </div> 
    )
  }
}
