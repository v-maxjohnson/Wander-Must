import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import Login from "./Login";
import "../styles/Navbar.css";

export default class Navibar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      loggedInUserIdNumber: localStorage.getItem("logged_in_user_id")
    };
  }

  renderNavItems = () => {
    if (this.props.loggedInUserIdNumber !== null) {
      return (
        <Nav className="navbar-nav ml-auto" navbar>
        <NavItem id="user-name-link" className="nav-item">
                  <p className="nav-link" id="user-name-text">&nbsp;</p>

                </NavItem>
                <NavItem className="nav-item">
                  <Link id="profile-link-button" className="nav-link" to={"/profile/" + this.state.loggedInUserIdNumber}>
                    <i className="fa fa-user-circle" title="Profile Page"> </i>
                  </Link>
                </NavItem>

                <NavItem className="nav-item">
                  <span className="suitcase-input" onClick={() => this.props.showNewSuitcaseModal()}>
                    <a className="nav-link" data-toggle="tooltip" title="Add new Suitcase" data-placement="middle" data-original-title="Add new suitcase">
                      <i className="fa fa-suitcase" data-toggle="tooltip" title="Add new Suitcase"> </i>
                    </a>
                  </span>
                </NavItem>

                <NavItem className="nav-item">
                  <button className="btn btn-primary btn-sm px-3 py-2" id="logout-btn">Logout</button>
                </NavItem>
        </Nav>
      )
    } else {
      return (
      <Nav className="navbar-nav ml-auto" navbar>
      <NavItem className="nav-item">
                  <Login />
                </NavItem>
      </Nav> )
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout = event => {
    event.preventDefault();
    fetch("logout", { method: "GET" })
      .then(
        this.setState({
          isAuthenticated: false
        }
        )
      )
  }

  maybeLogout() {
    if (this.state.isAuthenticated === false) { return (<Redirect to="/" />) }
  }

  render() {
    return (
      <div>
        {this.maybeLogout()}
        <Navbar className="navbar navbar-transparent fixed-top navbar-expand-lg">
          <div className="container">
            <NavbarBrand className="navbar-brand wandermust-font">Wander-Must</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                {this.renderNavItems()}
            </Collapse>

          </div>
        </Navbar>
      </div>

    )
  }
}
