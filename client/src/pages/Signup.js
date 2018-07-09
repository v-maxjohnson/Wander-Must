import React, { Component } from 'react';
// import SignupCard from "../components/SignupCard";
import { Input } from 'reactstrap';
import Navibar from "../components/Navbar";
import Footer from "../components/Footer";
import { Redirect } from 'react-router-dom';
import Profile from "../pages/Profile";
import "../styles/Signup.css";
import validator from 'validator';
 
const required = (value) => {
  if (!value.toString().trim().length) {
    return 'require';
  }
};
 
const email = (value) => {
  if (!validator.isEmail(value)) {
    return `${value} is not a valid email.`
  }
};

export default class Signup extends Component {
  constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
    this.state = {
        isAuthenticated: false,
        id: "",
        username: "",
        email: "",
        password: "",
        gender: ""
    }
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
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      gender: this.state.gender
    }

    console.log('this.state: ' + JSON.stringify(this.state));

    let newData = JSON.stringify(data);
    console.log('signup: ' + newData);

    fetch('api/users', {
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
        password: "",
        id: data.id,
        username: data.username,
        gender: data.gender,
        isAuthenticated: true
      });
      localStorage.setItem("logged_in_user_id", data.id)
    })
  }

  maybeRedirect() {
    if (this.state.isAuthenticated === true) {
      let userId = this.state.id;
      console.log('userId: ' + userId);
      return (
        <Redirect to={'/profile/' + userId} render={(props) => <Profile {...props} /> } />     
      )
    }
  }

render() {
  return (
    <div className="signup signup-page collapse-sidebar">
      {this.maybeRedirect()}
      <Navibar />
     
        <div className="page-header header-filter" filter-color="purple" id="background-signup">
          <div className="container">
            <div className="section section-signup page-header">
              <h1 className="ml4">
                <span className="letters letters-1">Ready</span>
                <span className="letters letters-2">Set</span>
                <span className="wandermust letters letters-3">Wander-Must</span>
              </h1>

    <div className="container">
                <div className="row">
                  <div className="col-md-8 col-lg-6 col-sm-9 ml-auto mr-auto">
                    <div className="card card-signup">
                      <form className="form" onSubmit={this.handleSubmitEvent}>
                        <div className="card-header card-header-primary text-center">
                          <h4>Sign Up</h4>
                          <div className="social-line">
                            <a href="#pablo" className="btn btn-link btn-just-icon">
                              <i className="fa fa-facebook-square"></i>
                            </a>
                            <a href="/login/twitter" className="btn btn-link btn-just-icon">
                              <i className="fa fa-twitter"></i>
                            </a>
                            <a href="#pablo" className="btn btn-link btn-just-icon">
                              <i className="fa fa-google-plus"></i>
                            </a>
                          </div>
                        </div>
                        <p className="text-divider">Or Be Old Fashioned</p>
                        <div className="card-body">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="material-icons">face</i>
                              </span>
                            </div>
                            <Input type="text" className="form-control" name="username" id="user-name" placeholder="Username..." value={this.state.username} onChange={this.handleChange} validations={[required]} />
                          </div>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="material-icons">email</i>
                              </span>
                            </div>
                            <Input type="email" className="form-control" name="email" id="user-email" placeholder="Email..." value={this.state.email} onChange={this.handleChange} validations={[required, email]} />
                          </div>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="material-icons">lock_outline</i>
                              </span>
                            </div>
                            <Input type="password" className="form-control" name="password" id="user-password" placeholder="Password..."  value={this.state.password} onChange={this.handleChange} validations={[required]} />
                          </div>

                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="material-icons">supervised_user_circle</i>
                              </span>
                            </div>
                            <Input type="select" className="custom-select" id="user-gender" name="gender" placeholder="Gender" value={this.state.gender} onChange={this.handleChange} validations={[required]}>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="noGender">I prefer not to answer</option>
                            </Input>
                          </div>
                        </div>
                        <div className="card-footer justify-content-center">
                          <button id="signup-btn" className="btn btn-primary btn-lg">Get Started</button>
                        </div>
                      </form>
                    </div> {/* ends card-signup */}
                  </div> {/* ends column in cards */}
                </div> {/* ends row for card */}
              </div> {/* ends container */}

            </div> {/* ends section-signup */}
          </div> {/* ends container */}
        </div> {/* ends header */}
      <Footer />
    </div> 
  )
}
}
