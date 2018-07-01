import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, Input } from 'reactstrap';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../styles/Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      email: "",
      password: "",
      isAuthenticated: false,
      userData: {
        id: "",
        username: "",
        gender: "",
        user_image: ""
      }
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  handleChange = event => {
    const { name , value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmitEvent = event => {
    event.preventDefault();
    // data that's going into the submit form
    const data = {
      email: this.state.userData.email,
      password: this.state.userData.password
    }
    // converting the data to JSON to pass in on the fetch req
    let newData = JSON.stringify(data);
    fetch('api/signin', {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type':'application/json'
      },
      body: newData
    })
    //receiving the response as json
    .then(res => res.json())
    .then(result => {
      this.setState ({
        isAuthenticated: true,
        dropdownOpen: false,
        email: "",
        password: "",
        userData: {
          id: result.id,
          username: result.username,
          gender: result.gender,
          user_image: result.user_image
        }
      })
    })
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} className="login-dropdown">
        <DropdownToggle className="dropdown-toggle nav-link" caret>
          <i className="fa fa-user-circle" title="Profile Page"> </i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu dropdown-with-icons">
          <form className="p-8 col-12" onSubmit={this.handleSubmitEvent}>
            <label htmlFor="email" className="col-sm-offset-1">Email Address</label>
            <Input className="text" type="email" name="email" 
            value={this.state.userData.email}
            onChange={this.handleChange}
            />
            <label htmlFor="password">Password</label>
            <Input name="password" type="password"  
            value={this.state.userData.password}
            onChange={this.handleChange}
            />
            <div className="row">
              <div className="col-5">
                <input className="btn btn-primary btn-sm mt-3 mx-auto px-3 py-2" type="submit" value="Login" />
              </div>

              <div className="col-5">
                <a className="btn btn-sm mt-3 mx-auto px-3 py-2" href="/signup">SignUp</a>
              </div>
            </div>
          </form>
        </DropdownMenu>
      </Dropdown>
    );
  }
}