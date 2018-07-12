import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { Button, CustomInput, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "./Home";
import DeleteAccountConfirmationModal from "../components/DeleteAccountConfirmationModal";
import "../styles/Account.css";
import gql from "graphql-tag";
import ApolloClient from 'apollo-boost';
import axios from 'axios';

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

export default class Account extends Component {
  state = {
    userData: {
      user_image: "",
      username: ""
    },

    email: "",
    username: "",
    gender: "",
    user_image: "",
    imageData: "",
    fileName: "Upload your image!",
    openDeleteAccountConfirmationModal: false,
    loggedInUserId: localStorage.getItem("logged_in_user_id")
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
      imageData : imageData,
      fileName: file.name 
    });
    
  }

  getUser = () => {
    client.query({
      query: GET_USER_QUERY,
      variables: { id: this.state.loggedInUserId },
      fetchPolicy: "network-only"
    })
      .then( result => {
        console.log(JSON.stringify(result.data.getUser) + " THIS IS WHAT WILL BE SET TO THIS.STATE BEFORE USER CHANGES ANYTHING");
        console.log(result.data.getUser.username+ " THIS IS WHAT WILL BE SET TO THIS.STATE BEFORE USER CHANGES ANYTHING");
        console.log(result.data.getUser.email+ " THIS IS WHAT WILL BE SET TO THIS.STATE BEFORE USER CHANGES ANYTHING");
        console.log(result.data.getUser.gender+ " THIS IS WHAT WILL BE SET TO THIS.STATE BEFORE USER CHANGES ANYTHING");
        console.log(result.data.getUser.user_image+ " THIS IS WHAT WILL BE SET TO THIS.STATE BEFORE USER CHANGES ANYTHING");

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

  handleInputChange = event => {
    const { name, value } = event.target;
    console.log(JSON.stringify({name, value}) + " THIS IS WHAT WE ARE SETTING TO UPDATED BEFORE MAPPING")
    let existingData = { ...this.state };
    let updated = {
        [name] : value
    };

    Object.keys(updated).forEach(item => updated[item] ? "" : delete updated[item]);

    updated = { ...existingData, ...updated };
    console.log(JSON.stringify(updated, null, 2) + " THIS IS WHAT I AM SETTING TO STATE ON INPUT CHANGE");

    this.setState({
        username: updated.username,
        email: updated.email,
        gender: updated.gender 
    });
};

  handleFormSubmit = event => {
    event.preventDefault();

    axios({
      method: "POST",
      url: "https://api.cloudinary.com/v1_1/wandermust/upload/",
      data: this.state.imageData 
    })
      .then( res => {
        const secure_url = res.data.secure_url;

        this.setState({ 
          userData: {
            user_image: secure_url
          },
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
                          placeholder={this.state.email}
                          // value={this.state.email}
                          onChange={this.handleInputChange}
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="username" sm={3}>User Name</Label>
                      <Col sm={9}>
                        <Input
                          type="username"
                          name="username"
                          placeholder={this.state.username}
                          // value={this.state.username}
                          onChange={this.handleInputChange}
                        />
                      </Col>

                    </FormGroup>
                    {/* <FormGroup row>
                      <Label for="examplePassword" sm={3}>Password</Label>
                      <Col sm={4}>
                        <Input
                          type="password"
                          name="password"
                          id="examplePassword"
                          placeholder="change password"
                        />
                      </Col> */}
                      {/* <Col sm={5}>
                        <Input
                          type="password"
                          name="password"
                          placeholder="password confirmation"
                          value={this.state.password}
                          onChange={this.handlePasswordChange}
                        />
                      </Col> 
                    </FormGroup> */}
                    <FormGroup row>
                      <Label for="exampleCheckbox" sm={3}>Gender</Label>
                      <Col sm={9}>
                        <div>
                          <CustomInput 
                            inline type="radio" id="female" name="gender" 
                            label="Female" value="female" 
                            onClick={this.handleInputChange}
                          />
                          <CustomInput 
                            inline type="radio" id="male" name="gender" 
                            label="Male" value="male" 
                            onClick={this.handleInputChange}
                          />
                          <CustomInput 
                            inline type="radio" id="noGender" name="gender" 
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
                    <FormGroup row>
                      <Label for="deleteConfirmation" sm={3}>Type "Bye!"</Label>
                      <Col sm={9}>
                        <Input type="text" name="text" id="deleteConfirmation" placeholder="Bye!" />
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