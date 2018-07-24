import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, Input } from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import Profile from "../pages/Profile";
import "../styles/Login.css";
import validate from 'validate.js';


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      isAuthenticated: false,
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      userData: {
        id: "",
        username: "",
        gender: "",
        user_image: ""
      }
    };

    this.constraints = {
      email: { 
        presence: true,
        email: {
          presence: true,
        }
      },
      password: {
        presence: true,
        length: {
          minimum: 6,
          maximum: 20,
        },
      }
    }
  }

  handleEmailError = (e) => {
    let { name, value } = e.target;

    this.setState({
      [name]: value
    })

    let result = validate({email: value}, this.constraints)
    if (result) {
      if (result.email) {
        this.setState({emailError: result.email[0]})
      } else {
        this.setState({emailError: ""})
      }
    } 
  }
  

  handlePasswordError = (e) => {
    let { name, value } = e.target;

    this.setState({
      [name]: value
    })

    let result = validate({password: value}, this.constraints)
    if (result) {
      if (result.password) {
        this.setState({passwordError: result.password[0]})
      } else {
        this.setState({passwordError: ""})
      }
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    let existingData = { ...this.state };
    let updated = {
        [name] : value
    };

    Object.keys(updated).forEach(item => updated[item] ? "" : delete updated[item]);

    updated = { ...existingData, ...updated };

    this.setState({
        email: updated.email,
        password: updated.password
    });

};



  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmitEvent = event => {
    event.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    let newData = JSON.stringify(data);

    fetch('api/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: newData
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          isAuthenticated: true,
          dropdownOpen: false,
          email: "",
          password: "",
          userData: {
            id: data.id,
            username: data.username,
            gender: data.gender,
            user_image: data.user_image
          }
        })
        localStorage.setItem("logged_in_user_id", data.id)
      })
  }

  maybeRedirect() {
    if (this.state.isAuthenticated === true) {
      let userId = this.state.userData.id;
      return (
        <Redirect to={'/profile/' + userId} render={(props) => <Profile {...props} />} />
      )
    }
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="login-dropdown">
        {this.maybeRedirect()}
        <DropdownToggle className="dropdown-toggle nav-link" caret>
          <i className="fa fa-user-circle" title="Profile Page"> </i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu dropdown-with-icons">
          <form className="p-8 col-12" onSubmit={this.handleSubmitEvent}>
            <label htmlFor="email" className="col-sm-offset-1">Email Address</label>
            <Input className="text" type="email" name="email"
              value={this.state.email}
              onChange={this.handleEmailError}
            />
          {<p className="error-login">{this.state.emailError}</p>}
            <label htmlFor="password">Password</label>
            <Input name="password" type="password"
              value={this.state.password}
              onChange={this.handlePasswordError}
            />
            <p className="error-login">{this.state.passwordError}</p>
            <div className="row">
              <div className="col-5">
                <input className="btn btn-primary btn-sm mt-3 mx-auto px-3 py-2" type="submit" value="Login" />
              </div>

              <div className="col-5">
                <Link className="btn btn-sm mt-3 mx-auto px-3 py-2" to="/signup">
                  SignUp
                </Link>
              </div>
            </div>
          </form>
        </DropdownMenu>
      </Dropdown>
    );
  }
}