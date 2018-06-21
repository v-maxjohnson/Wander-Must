import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import "../styles/Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="login-dropdown">
        <DropdownToggle className="dropdown-toggle nav-link" caret>
          <i className="fa fa-user-circle" title="Profile Page"> </i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu dropdown-with-icons">
          <form className="p-3" id="signin" name="" method="post" action="api/signin">
            <label htmlFor="email">Email Address</label>
            <input className="text" name="email" type="text" />
            <label htmlFor="password">Password</label>
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
        </DropdownMenu>
      </Dropdown>
    );
  }
}