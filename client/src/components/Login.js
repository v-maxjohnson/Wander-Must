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
      password: ""
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
    // const data = new FormData(event.target);
    console.log(`
      ${this.state.email}
      ${this.state.password}    
    `)

    fetch('/api/signin', {
      method: 'POST',
      body: {
        email: this.state.email,
        password: this.state.password
      }
    }).then(result => {
      if (result.status === 200) {
        // want to place redirect to profile page and
        // update to setState (isLoggedIn) here
        // this.setState({})
        console.log("success!!")
      } else {
        console.log("NOT SUCCESSFUL; go home")
      }
      console.log(result)
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