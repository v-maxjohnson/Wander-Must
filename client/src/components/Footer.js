import React, { Component } from 'react';

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
                <a className="wandermust-font" href="/">
                  Wander-Must
            </a>
              </li>

              <li>
                <a href="https://www.creative-tim.com/license">
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
