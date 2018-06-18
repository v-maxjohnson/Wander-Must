import React, { Component } from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg" color-on-scroll="100" id="sectionsNav">
    <div className="container">
      <div className="navbar-translate">
        <a className="navbar-brand wandermust-font" href="/">
          Wander-Must </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ml-auto">

          <li id="login-dropdown" className="nav-item dropdown">
            <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
              <i className="fa fa-user-circle" title="Profile Page"> </i>
            </a>

            <div className="dropdown-menu dropdown-with-icons">

              <form className="p-3" id="signin" name="" method="post" action="api/signin">
                <label for="email">Email Address</label>
                <input className="text" name="email" type="text" />
                <label for="password">Password</label>
                <input name="password" type="password" />
                <div className="row">
                  <div className="col-6">
                    <input className="btn btn-primary btn-sm mt-3 mx-auto px-3 py-2" type="submit" value="Login" />
                  </div>

                  <div className="col-6">
                    <a className="btn btn-sm mt-3 mx-auto px-3 py-2" href="/signup">SignUp</a>
                  </div>
                </div>
              </form>
            </div>

          </li>

          <li id="profile-link" className="nav-item">
            <a href="/profile/" id="profile-link-button" className="nav-link">
              <i className="fa fa-user-circle" title="Profile Page"> </i>
            </a>

          </li>

          <li className="nav-item" id="suitcase-link">
            <span className="suitcase-input" data-toggle="modal" data-target="#suitcase-modal">
              <a className="nav-link" data-toggle="tooltip" title="Add new Suitcase" data-placement="middle" data-original-title="Add new suitcase">
                <i className="fa fa-suitcase" data-toggle="tooltip" title="Add new Suitcase"> </i>
              </a>
            </span>
          </li>

          <li className="nav-item" id="logout">
            <button className="btn btn-primary btn-sm px-3 py-2" id="logout-btn">Logout</button>
          </li>

        </ul>
      </div>
    </div>
  </nav>
    )
  }
}
