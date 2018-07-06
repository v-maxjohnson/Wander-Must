import React, { Component } from 'react';
import { Button, CustomInput, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewSuitcaseModal from "../components/NewSuitcaseModal";
import "../styles/Account.css";
import gql from "graphql-tag";
import ApolloClient from 'apollo-boost';

const GET_USER_QUERY = gql`
query getUser( $id: String! ){
  getUser(id: $id) {
    id
    username
    gender
    user_image
    email
  }
}`;

const client = new ApolloClient();

export default class Account extends Component {
  state = {
    userData: {
      id: "",
      username: "",
      gender: "",
      user_image: ""
    },
    rendered: false,
    openNewSuitcaseModal: false,
    loggedInUserId: localStorage.getItem("logged_in_user_id")
  }

  componentDidMount() {

    client.query({
      query: GET_USER_QUERY,
      variables: { id: this.state.loggedInUserId }
    }).then(result => {
      this.setState({ userData: result.data.getUser, rendered: true });
      console.log(this.state.userData);
    })

  }

  showNewSuitcaseModal = () => {
    this.setState({ openNewSuitcaseModal: true });
  }

  resetNewSuitcaseModal = () => {
    this.setState({ openNewSuitcaseModal: false });
  }

  renderNewSuitcaseModal = () => {
    if (this.state.openNewSuitcaseModal) {
      return <NewSuitcaseModal
        resetNewSuitcaseModal={this.resetNewSuitcaseModal}
      />
    }
  }

  render() {
    return (
      <div className="account profile-page sidebar-collapse">
        <Header
          showNewSuitcaseModal={this.showNewSuitcaseModal}
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
                        <img src={this.state.userData.user_image} alt="Avatar" className="img-raised rounded-circle img-fluid" />
                      </div>
                      <div className="name">
                        <h3 id="profile-user-name" className="title">{this.state.userData.username} </h3>
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
                              <p className="nav-link" id="suitcase-user">{this.state.userData.username}</p>
                            </li>
                            <li className="nav-item ">
                              <p className="nav-link" id="suitcase-user-gender">{this.state.userData.gender}</p>
                            </li>
                            <li className="nav-item ">
                              <p className="nav-link" id="suitcase-user-email">{this.state.userData.email}</p>
                            </li>

                          </ul>
                        </div>
                      </div>
                    </div>

                  </div>


                </div>
                <div className="form-container offset-2 col-8">
                  <Form>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={3}>Email</Label>
                      <Col sm={9}>
                        <Input type="email" name="email" id="exampleEmail" placeholder={this.state.userData.email} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="username" sm={3}>User Name</Label>
                      <Col sm={9}>
                        <Input type="username" name="username" id="exampleUsername" placeholder={this.state.userData.username} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="examplePassword" sm={3}>Password</Label>
                      <Col sm={4}>
                        <Input type="password" name="password" id="examplePassword" placeholder="change password" />
                      </Col>
                      <Col sm={5}>
                        <Input type="password" name="password" id="examplePassword" placeholder="password confirmation" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleCheckbox" sm={3}>Gender</Label>
                      <Col sm={9}>
                        <div>
                          <CustomInput type="radio" name="customRadio" id="exampleCustomInline" label="Female" inline />
                          <CustomInput type="radio" name="customRadio" id="exampleCustomInline2" label="Male" inline />
                          <CustomInput type="radio" name="customRadio" id="exampleCustomInline3" label="Beyond Society's Gender Definitions" inline />
                        </div>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleCustomFileBrowser" sm={3}>Avatar</Label>
                      <Col sm={9}>
                        <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" label="Show us who you are w/ an image." />
                      </Col>
                    </FormGroup>
                    <FormGroup check row>
                      <Col sm={{ size: 2, offset: 5 }}>
                        <Button color="primary">Submit</Button>
                      </Col>
                    </FormGroup>
                  </Form>
                  <div>
                    <br/>
                    <hr/>
                    <br/>
                    <br/>
                  </div>

                  <Form>

                    <FormGroup row>
                      <Label for="exampleEmail" sm={3}>Delete Account?</Label>
                      <Col sm={9}>
                        <Input type="textarea" name="text" id="exampleEmail" placeholder="Please tell us why you want to leave us! We love you... we're codependent, and we want to fix it" />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="exampleEmail" sm={3}>Type "Bye!"</Label>
                      <Col sm={9}>
                        <Input type="text" name="text" id="exampleEmail" placeholder="Bye!" />
                      </Col>
                    </FormGroup>
                    <FormGroup check row>
                      <Col sm={{ size: 12, offset: 4 }}>
                        <Button color="warning">-----Goodbye FOREVER-------</Button>
                      </Col>
                    </FormGroup>
                    <br/>
                  </Form>
                </div>

              </div>
            </div>
          </div>




        </Main>
        {this.renderNewSuitcaseModal()}
        <Footer />
      </div>
    )
  }
}