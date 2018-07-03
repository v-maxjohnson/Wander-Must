import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, Input } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Profile from "../pages/Profile";
import "../styles/Login.css";

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
    const data = {
      email: this.state.email,
      password: this.state.password
    }
    let newData = JSON.stringify(data);
    console.log('auth request credentials: ' + newData);

    fetch('api/signin', {
      method: 'POST',
      headers: {
        'Accept' : 'application/json',
        'Content-Type':'application/json'
      },
      body: newData
    })
    .then(res => res.json())
    .then(data => {
      this.setState ({
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
    })
  }

  maybeRedirect() {
    if (this.state.isAuthenticated === true) {
      let userId = this.state.userData.id;
      console.log('userId: ' + userId);
      return (
        <Redirect to={'/profile/' + userId} render={(props) => <Profile {...props} /> } />     
      )
    }
    console.log('state after redirect: ' + JSON.stringify(this.state));
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
            onChange={this.handleChange}
            />
            <label htmlFor="password">Password</label>
            <Input name="password" type="password"  
            value={this.state.password}
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