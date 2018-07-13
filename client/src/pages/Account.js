import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Button, CustomInput, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { withAlert } from 'react-alert';
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "./Home";
import DeleteAccountConfirmationModal from "../components/DeleteAccountConfirmationModal";
import "../styles/Account.css";
import gql from "graphql-tag";
import axios from 'axios';
import ApolloClient from 'apollo-boost';
import validate from 'validate.js';

const GET_USER_QUERY = gql`
query getUser( $id: ID ){
  getUser(id: $id) {
    id
    username
    gender
    user_image
    email
  }
  }`;

const UPDATE_USER_IMAGE_MUTATION = gql`
mutation updateUserImage( $id: ID, $user_image: String! ){
  updateUserImage( id: $id, user_image: $user_image){
    id
    username
    gender
    user_image
    email
  }
}`;

const UPDATE_USER_NAME_MUTATION = gql`
mutation updateUserName( $id: ID, $username: String! ){
  updateUserName( id: $id, username: $username){
    id
    username
    gender
    user_image
    email
  }
}`;

const UPDATE_USER_EMAIL_MUTATION = gql`
mutation updateUserEmail( $id: ID, $email: String! ){
  updateUserEmail( id: $id, email: $email){
    id
    username
    gender
    user_image
    email
  }
}`;

const UPDATE_USER_GENDER_MUTATION = gql`
mutation updateUserGender( $id: ID, $gender: String! ){
  updateUserGender( id: $id, gender: $gender){
    id
    username
    gender
    user_image
    email
  }
}`;

const DELETE_USER_MUTATION = gql` 
mutation deleteUser( $id: ID ){
    deleteUser(id: $id) {
      id
    }
}`;

const client = new ApolloClient();

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: {
        username: ""
      },

      email: "",
      username: "",
      emailError: "",
      usernameError: "",
      gender: "",
      user_image: "",
      imageData: "",
      fileName: "Upload your image!",
      openDeleteAccountConfirmationModal: false,
      loggedInUserId: localStorage.getItem("logged_in_user_id")
    }

    this.constraints = {
      email: { 
        presence: true,
        email: true
      },
      username: {
        presence: true,
        length: {
          minimum: 3,
          maximum: 15
        }
      }
    }
  }
  
  

  componentDidMount() {

    this.getUser();

  }

  handleImageChange = event => {
    let file = event.target.files[0];
    let imageData = new FormData();
    imageData.append("file", file);
    imageData.append("upload_preset", "qocvkmel");
    
    this.setState({
      imageData: imageData,
      fileName: file.name 
    });

    var hiddenDiv = document.getElementById("settings-updated");
    hiddenDiv.style.display = "none";
  }

  getUser = () => {
    client.query({
      query: GET_USER_QUERY,
      variables: { id: this.state.loggedInUserId },
      fetchPolicy: "network-only"
    })
      .then( result => {
        this.setState({ 
          username: result.data.getUser.username,
          email: result.data.getUser.email,
          gender: result.data.getUser.gender,
          user_image: result.data.getUser.user_image
        }) 
    })
  }

  deleteUser = () => {
    client.mutate({
      mutation: DELETE_USER_MUTATION,
      variables: { id: this.state.loggedInUserId }
    }).then( () => {
      this.handleLogout();
    })
  }

  handleEmailError = (e) => {
    this.handleInputChange;

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
    this.handleInputChange;

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

  handleInputChange = event => {

    

    const { name, value } = event.target;
    let existingData = { ...this.state };
    let updated = {
        [name] : value
    };

    Object.keys(updated).forEach(item => updated[item] ? "" : delete updated[item]);

    updated = { ...existingData, ...updated };

    this.setState({
        username: updated.username,
        email: updated.email,
        gender: updated.gender
    });

    var hiddenDiv = document.getElementById("settings-updated");
    hiddenDiv.style.display = "none";
};

  handleFormSubmit = event => {
    event.preventDefault();

    let data = {
      username: this.state.username,
      email : this.state.email, 
    }

    let result = validate(data, this.constraints)
    if (result) {
      if (result.username) {
        this.setState({usernameError: result.username[0]});
      }
      if (result.email) {
        this.setState({emailError: result.email[0]});
      }
    } else {
    axios({
      method: "POST",
      url: "https://api.cloudinary.com/v1_1/wandermust/upload/c_fill,h_150,w_150",
      data: this.state.imageData 
    })
      .then( res => {
        const secure_url = res.data.secure_url;

        this.setState({ 
          user_image: secure_url,
          fileName: "Upload your image!" 
        });
        
        client.mutate({
          mutation: UPDATE_USER_IMAGE_MUTATION,
          variables: { id: this.state.loggedInUserId, user_image: secure_url },
          fetchPolicy: 'no-cache'
        })
          .catch( err => console.log(err) )
      })

    client.mutate({
      mutation: UPDATE_USER_NAME_MUTATION,
      variables: { id: this.state.loggedInUserId, username: this.state.username },
      fetchPolicy: 'no-cache'
    })
      .catch( err => console.log(err.message) );

    client.mutate({
      mutation: UPDATE_USER_EMAIL_MUTATION,
      variables: { id: this.state.loggedInUserId, email: this.state.email },
      fetchPolicy: 'no-cache'
    })
      .catch( err => console.log(err.message) );
        
    client.mutate({
      mutation: UPDATE_USER_GENDER_MUTATION,
      variables: { id: this.state.loggedInUserId, gender: this.state.gender },
      fetchPolicy: 'no-cache'
    })
      .catch( err => console.log(err.message) );

      this.setState({
        userData: {
          username: this.state.username
        }
      })

      this.props.alert.show(<div className="success-alert">Your account settings have been updated and saved!</div>);
  }
};

  showDeleteAccountConfirmationModal = () => {
    this.setState({ openDeleteAccountConfirmationModal: true });
  }

  resetDeleteAccountConfirmationModal = () => {
    this.setState({ openDeleteAccountConfirmationModal: false });
  }

  renderDeleteAccountConfirmationModal = () => {
    if (this.state.openDeleteAccountConfirmationModal) {
      return <DeleteAccountConfirmationModal
        resetDeleteAccountConfirmationModal={this.resetDeleteAccountConfirmationModal}
        deleteUser={this.deleteUser}
      />
    }
  }

  handleLogout = () => {
    fetch("logout", { method: "GET" })
      .then(
        this.setState({
          isAuthenticated: false
        })
      )
  }

  maybeLogout = () => {
    if (this.state.isAuthenticated === false) {
      return (
      <Redirect to="/" render={(props) => <Home {...props} />} />
      )
    }
  }

  render() {
    return (
      <div className="account profile-page sidebar-collapse">
      {this.maybeLogout()}
        <Header
          showNewSuitcaseModal={this.props.showNewSuitcaseModal}
          loggedInUserIdNumber={this.state.loggedInUserIdNumber}
          key={this.state.userData.username}
        />
        <Main>
          <div className="page-header header-filter" id="background-account" data-parallax="true"></div>
          <div className="main main-raised">
            <div className="profile-content">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 ml-auto mr-auto">
                    <div className="profile">
                      <div className="avatar">
                        <img src={this.state.user_image} alt="Avatar" className="img-raised rounded-circle img-fluid" />
                      </div>
                      <div className="name">
                        <h3 id="profile-user-name" className="title">{this.state.username} </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">

                  <div className="card card-nav-tabs card-plain">
                    <div className="suitcase-header card-header card-header-default">

                      <div id="suitcase-nav" className="nav-tabs-navigation">
                        <div className="nav-tabs-wrapper">
                          <ul className="nav suitcase-nav">
                            <li className="nav-item ">
                              <p className="nav-link" id="suitcase-user">{this.state.username}</p>
                            </li>
                            <li className="nav-item ">
                              <p className="nav-link" id="suitcase-user-gender">{this.state.gender}</p>
                            </li>
                            <li className="nav-item ">
                              <p className="nav-link" id="suitcase-user-email">{this.state.email}</p>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>

                  </div>


                </div>
                <div className="form-container offset-2 col-8">
                  <Form onSubmit={this.handleFormSubmit}>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={3}>Email</Label>
                      <Col sm={9}>
                        <Input
                          type="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleEmailError}
                        />
                        <p className="error-text">{this.state.emailError}</p>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="username" sm={3}>User Name</Label>
                      <Col sm={9}>
                        <Input
                          type="username"
                          name="username"
                          value={this.state.username}
                          onChange={this.handleUsernameError}
                        />
                        <p className="error-text">{ this.state.usernameError }</p>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleCheckbox" sm={3}>Gender</Label>
                      <Col sm={9}>
                        <div>
                          <CustomInput 
                            inline="true" type="radio" id="female" name="gender" 
                            label="Female" value="female" 
                            onClick={this.handleInputChange}
                          />
                          <CustomInput 
                            inline="true" type="radio" id="male" name="gender" 
                            label="Male" value="male" 
                            onClick={this.handleInputChange}
                          />
                          <CustomInput 
                            inline="true" type="radio" id="noGender" name="gender" 
                            label="Beyond Society's Gender Definitions" value="noGender"
                            onClick={this.handleInputChange}
                          />
                        </div>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label for="exampleCustomFileBrowser" sm={3}>Avatar</Label>
                      <Col sm={9}>
                        <CustomInput 
                          type="file" 
                          id="exampleCustomFileBrowser" 
                          name="file"
                          label={this.state.fileName}
                          onChange={this.handleImageChange}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup check row>
                      <Col sm={{ size: 2, offset: 5 }}>
                        <Button color="primary" onClick={this.handleFormSubmit} >Submit</Button>
                      </Col>
                    </FormGroup>
                  </Form>
                  <div>
                    <br />
                    <hr />
                    <br />
                    <br />
                  </div>

                  <Form>

                    <FormGroup row>
                      <Label for="deleteAccount" sm={3}>Delete Account?</Label>
                      <Col sm={9}>
                        <Input type="textarea" name="text" id="deletionReason" placeholder="Please tell us why you want to leave us! We love you... we're codependent, and we want to fix it" />
                      </Col>
                    </FormGroup>

                    <FormGroup check row>
                      <Col sm={{ size: 12, offset: 4 }}>
                        <Button onClick={() => this.showDeleteAccountConfirmationModal()} color="warning">-----Goodbye FOREVER-------</Button>
                      </Col>
                    </FormGroup>
                    <br />
                  </Form>
                </div>

              </div>
            </div>
          </div>


        </Main>
        {this.props.renderNewSuitcaseModal()}
        {this.renderDeleteAccountConfirmationModal()}
        <Footer />
      </div>
    )
  }
}

export default withAlert(Account);