import React, { Component } from 'react';
import { Input } from 'reactstrap';
import Navibar from "../components/Navbar";
import Footer from "../components/Footer";
import { Redirect } from 'react-router-dom';
import Profile from "../pages/Profile";
import "../styles/Signup.css";
import validate from 'validate.js';
 

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
        gender: "",
        emailError: "",
        usernameError: "",
        passwordError: ""
    }


    this.constraints = {
        username: {
          presence: true,
          length: {
            minimum: 2,
            maximum: 14,
            message: "must be between 3 and 15 characters",
            },
        },
        email: { 
          presence: true,
          email: true
        }, 
        password: {
          presence: true,
          length: {
            minimum: 5,
            maximum: 19,
            message: "must be between 6 and 20 characters"
          },
        },
      }
    }
  
  submitForm = event => {
    event.preventDefault();
  
      let data = {
        username: this.state.username,
        email : this.state.email,
        password: this.state.password
      }
  
      let result = validate(data, this.constraints)
      if (result) {
        if (result.username) {
          this.setState({usernameError: result.username[0]});
        }
        if (result.email) {
          this.setState({emailError: result.email[0]});
        }
        if (result.password) {
          this.setState({passwordError: result.password[0]})
        }
      }
  }

  handleEmailError = (e) => {
    let { name, value } = e.target;

    this.setState({
      [name]: value
    })

    let result = validate({email: this.state.email}, this.constraints)
    if (result.email) {
      this.setState({emailError: result.email[0]})
    } else {
      this.setState({emailError: ""})
    }
  }

  handleUsernameError = (e) => {
    let { name, value } = e.target;

    this.setState({
      [name]: value
    })

    let result = validate({username: this.state.username}, this.constraints)
    if (result.username) {
      this.setState({usernameError: result.username[0]})
    } else {
      this.setState({usernameError: ""})
    }
  }

  handlePasswordError = (e) => {
    let { name, value } = e.target;

    this.setState({
      [name]: value
    })

    let result = validate({password: this.state.password}, this.constraints)
    if (result.password) {
      this.setState({passwordError: result.password[0]})
    } else {
      this.setState({passwordError: ""})
    }
  }

  // this is needed for gender 
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

    let result = validate(data, this.constraints)

    if (result) {
      if (result.username) {
        this.setState({usernameError: result.username[0]});
      }
      if (result.email) {
        this.setState({emailError: result.email[0]});
      }
      if (result.password) {
        this.setState({passwordError: result.password[0]})
      }
    } 
    else {
      let newData = JSON.stringify(data);

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
  }

  maybeRedirect() {
    if (this.state.isAuthenticated === true) {
      let userId = this.state.id;
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
                          <Input type="text" className="form-control" name="username" id="user-name" placeholder="Username..." value={this.state.username} onChange={this.handleUsernameError}/>
                          
                        </div>
                        <p className="error-text">{this.state.usernameError}</p>

                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="material-icons">email</i>
                            </span>
                          </div>
                          <Input type="email" className="form-control" name="email" id="user-email" placeholder="Email..." value={this.state.email} onChange={this.handleEmailError}/>
                        </div>
                        <p className="error-text">{this.state.emailError}</p>

                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="material-icons">lock_outline</i>
                            </span>
                          </div>
                          <Input onKeyPress={this.resetPasswordError} type="password" className="form-control" name="password" id="user-password" placeholder="Password..."  value={this.state.password} onChange={this.handlePasswordError}/>
                        </div>
                        <p className="error-text">{this.state.passwordError}</p>

                        <div className="input-group">
                          <div className="input-group-prepend">
                            <span className="input-group-text">
                              <i className="material-icons">supervised_user_circle</i>
                            </span>
                          </div>
                          <Input type="select" className="custom-select" id="user-gender" name="gender" placeholder="Gender" value={this.state.gender} onChange={this.handleChange}>
                            <option value="noGender">I prefer not to answer</option>                            
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </Input>
                        </div>
                      </div>
                      <div className="card-footer justify-content-center">
                        <button type="submit" id="signup-btn" className="btn btn-primary btn-lg">Get Started</button>
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
