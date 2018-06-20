import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import "../styles/Navbar.css";

export default class Navibar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar className="navbar navbar-transparent fixed-top navbar-expand-lg">
          <div className="container">
            <NavbarBrand className="navbar-brand wandermust-font" href="/">Wander-Must</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="navbar-nav ml-auto" navbar>
                <DropdownItem className="nav-item dropdown">
                  <a href="" className="dropdown-toggle nav-link" data-toggle="dropdown">
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

                </DropdownItem>

                <NavItem className="nav-item">
                  <a href="/profile/" id="profile-link-button" className="nav-link">
                    <i className="fa fa-user-circle" title="Profile Page"> </i>
                  </a>

                </NavItem>

                <NavItem className="nav-item">
                  <span className="suitcase-input" data-toggle="modal" data-target="#suitcase-modal">
                    <a className="nav-link" data-toggle="tooltip" title="Add new Suitcase" data-placement="middle" data-original-title="Add new suitcase">
                      <i className="fa fa-suitcase" data-toggle="tooltip" title="Add new Suitcase"> </i>
                    </a>
                  </span>
                </NavItem>

                <NavItem className="nav-item">
                  <button className="btn btn-primary btn-sm px-3 py-2" id="logout-btn">Logout</button>
                </NavItem>
              </Nav>
            </Collapse>

          </div>
        </Navbar>
      </div>

    )
  }
}
