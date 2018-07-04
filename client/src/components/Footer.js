import React, { Component } from 'react';
import { Link } from "react-router-dom";

// variable for current year
let year = new Date().getFullYear();

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <nav className="float-left">
            <ul>

              <li>
                <Link className="wandermust-font" to="/">
                  Wander-Must
                </Link>
              </li>

              <li>
                <a href="https://www.creative-tim.com/license" target="_blank" rel="noopener noreferrer">
                  Licenses
            </a>
              </li>
            </ul>
          </nav>
          <div className="copyright float-right text-right">
            &copy; {year}
            <span className="wandermust-font"> Wander-Must</span>
          </div>
        </div>
      </footer>
    )
  }
}
