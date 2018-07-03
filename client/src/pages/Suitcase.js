import React, { Component } from 'react';
import { Redirect } from 'react-router'
import Profile from "./Profile";
import Moment from 'react-moment';
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Category from "../components/Category";
import NewSuitcaseModal from "../components/NewSuitcaseModal";
import ConfirmationModal from "../components/ConfirmationModal";
import Yelp from "../utils/Yelp";
import Item from "../components/Item";
import suitcaseHandleWhite from "../images/suitcase-handle-white.png";
import "../styles/Suitcase.css";
import Wunderground from "../utils/Wunderground";
import gql from "graphql-tag";
import ApolloClient from 'apollo-boost';
import Autocomplete from 'react-autocomplete';


const GET_SUITCASE_QUERY = gql` 
query getSuitcase( $id: String! ){
  getSuitcase(id: $id) {
    start_date
    end_date
    travel_category
    Items {
      id
      item_name
      item_category
    }
    Locale {
      id
      locale_city
      locale_admin
      locale_country
    }
    User {
      id
      username
      gender
    }
  }
}`;

const DELETE_SUITCASE_QUERY = gql` 
mutation deleteSuitcase( $id: String! ){
    deleteSuitcase(id: $id) {
      id
    }
}`;

const client = new ApolloClient();

let suitcaseId = localStorage.getItem("suitcase_id");
let cityNoUnderscores = "";
let autocompleteItems;
let renderAutoValue;
let loggedInUserIdNumber = localStorage.getItem("logged_in_user_id");


export default class Suitcase extends Component {
  state = {
    suitcase: {
      start_date: "",
      end_date: "",
      travel_category: "",
      Items: [],
      Locale: [],
      User: []
    },
    allItems: [],
    rendered: false,
    openNewSuitcaseModal: false,
    openConfirmationModal: false,
    suitcaseId: suitcaseId,
    value: '',
    loggedInUserIdNumber: loggedInUserIdNumber
  };

  componentDidMount() {

    client.query({
      query: GET_SUITCASE_QUERY,
      variables: { id: this.state.suitcaseId }
    }).then(result => {
      this.setState({ suitcase: result.data.getSuitcase, rendered: true });
      console.log(this.state.suitcase, this.state.rendered);
    })

    client.query({
      query: gql` 
            { 
              allItems {
                item_name,
                item_category 
              }
            }`
    }).then(result => {
      this.setState({ allItems: result.data.allItems });
    })
  }

  setAutocompleteItems = () => {
    if (this.state.value !== "") {
      autocompleteItems =
        this.state.allItems
          .map((wmItem, i) => (
            { key: i, id: wmItem.id, label: wmItem.item_name, category: wmItem.item_category.toLowerCase() }
          ))
    } else {
      autocompleteItems =
        [
          { key: "01", label: '' },
        ]
    }
    return autocompleteItems
  }

  renderAutocomplete = () => {
    if (this.state.value !== "") {
      renderAutoValue =
        (item, highlighted) =>
          <div
            key={item.key}
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
          >
            {item.label} | <span className="auto-category">{item.category}</span>
          </div>
    } else {
      renderAutoValue =
        (item) =>
          <div
            key={item.key}
          >
          </div>
    }
    return renderAutoValue
  }

  renderWunderground = () => {
    if (this.state.rendered) {
      return (
        <Wunderground
          startDate={this.state.suitcase.start_date}
          endDate={this.state.suitcase.end_date}
          city={this.state.suitcase.Locale.locale_city}
          admin={this.state.suitcase.Locale.locale_admin}
          country={this.state.suitcase.Locale.locale_country}
        />
      )
    }
  }

  renderCityWithoutUnderscores = () => {
    if (this.state.rendered) {
      cityNoUnderscores = this.state.suitcase.Locale.locale_city.replace(/_/g, ' ');
      return (
        cityNoUnderscores
      )
    }
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

  showConfirmationModal = () => {
    this.setState({ openConfirmationModal: true });
  }

  resetConfirmationModal = () => {
    this.setState({ openConfirmationModal: false });
  }

  renderConfirmationModal = () => {
    if (this.state.openConfirmationModal) {
      return <ConfirmationModal
        resetConfirmationModal={this.resetConfirmationModal}
        deleteSuitcase={this.deleteSuitcase}
      />
    }
  }

  deleteSuitcase = () => {
    client.mutate({
      mutation: DELETE_SUITCASE_QUERY,
      variables: { id: this.state.suitcaseId }
    }).then(result => {
      this.setState({
        shouldRedirect: true
      })
      console.log(result);
    })
  }

  maybeRedirect() {
    if (this.state.shouldRedirect)
      return (
        <Redirect to={"/profile/" + this.state.loggedInUserIdNumber} render={(props) => <Profile {...props} />} />
      )
  }

  render() {
    return (
      <div className="suitcase profile-page sidebar-collapse">
        {this.maybeRedirect()}
        <Header
          showNewSuitcaseModal={this.showNewSuitcaseModal}
        />
        <Main>
          <div className="page-header header-filter" data-parallax="true" id="background-suitcase"></div>
          <div className="main main-raised">
            <div className="profile-content">

              <div className="container">
                <div className="row">
                  <div className="col-md-6 ml-auto mr-auto">
                    <div className="profile profile-handle">
                      <div className="handle">
                        <img src={suitcaseHandleWhite} alt="WM Handle" className="handle-image" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card card-nav-tabs card-plain">
                  <div className="suitcase-header card-header card-header-default">

                    <div id="suitcase-nav" className="nav-tabs-navigation">
                      <div className="nav-tabs-wrapper">
                        <ul className="nav suitcase-nav">
                          <li className="nav-item ">
                            <p className="nav-link" id="suitcase-user">{this.state.suitcase.User.username}</p>
                          </li>
                          <li className="nav-item ">
                            <p className="nav-link" id="suitcase-user-gender">{this.state.suitcase.User.gender}</p>
                          </li>
                          <li className="nav-item ">
                            <a className="nav-link" id="suitcase-locale" href={"/search/" + this.state.suitcase.Locale.locale_city}>{this.renderCityWithoutUnderscores()}</a>
                          </li>
                          <li className="nav-item">
                            <p className="nav-link d-inline-block" id="suitcase-startDate">
                              <Moment format="MMM DD, YYYY">
                                {this.state.suitcase.start_date}
                              </Moment>
                            </p>-
                            <p className="nav-link d-inline-block" id="suitcase-endDate">
                              <Moment format="MMM DD, YYYY">
                                {this.state.suitcase.end_date}
                              </Moment>
                            </p>
                          </li>

                          <li className="nav-item">
                            <p className="nav-link" id="suitcase-travelCategory">{this.state.suitcase.travel_category}</p>
                          </li>

                        </ul>
                        {this.renderWunderground()}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 text-center">
                      {this.state.loggedInUserIdNumber === this.state.suitcase.User.id ? (
                        <button className="btn btn-primary" onClick={() => { this.showConfirmationModal() }}><i className="fa fa-trash mr-2"></i> Delete this suitcase</button>
                      ) : (<div></div>
                        )}
                    </div>
                  </div>

                </div>
              </div>


              <div className="input-group mb-3 auto-items">
                <Autocomplete

                  items={this.setAutocompleteItems()}
                  shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                  getItemValue={item => item.label}
                  renderItem={this.renderAutocomplete()}
                  wrapperStyle={
                    {
                      position: 'relative',
                      zIndex: 9999
                    }
                  }
                  menuStyle={
                    {
                      position: 'absolute',
                      cursor: "pointer",
                      top: "35px",
                      left: 0,
                      backgroundColor: "white"
                    }
                  }
                  value={this.state.value}
                  onChange={e => this.setState({ value: e.target.value })}
                  onSelect={value => this.setState({ value })}
                />
                <div className="input-group-append">
                  <button type="button"><i className="fa fa-search"></i> Find an item</button>
                </div>
              </div>





              <div className="row">
                <div className="col-12">
                  <div id="items">

                    <Category>
                      <div className="title row">
                        <div>
                          <span className="badge badge-pill badge-info">Toiletries</span>
                        </div>
                        <div>
                          <button data-category="toiletries" className="all btn btn-primary btn-sm ml-3">Select all</button>
                        </div>
                      </div>
                      <div className="row cat-row" id="toiletries">
                        {this.state.suitcase.Items
                          .filter(item => (item.item_category === "TOILETRIES"))
                          .map((item, i) => (
                            <Item
                              key={i}
                              itemName={item.item_name}
                              itemCategory={item.item_category}
                            />
                          ))
                        }
                      </div>
                    </Category>

                    <Category>
                      <div className="title row">
                        <div>
                          <span className="badge badge-pill badge-info">Clothing</span>
                        </div>
                        <div>
                          <button data-category="clothing" className="all btn btn-primary btn-sm ml-3">Select all</button>
                        </div>
                      </div>
                      <div className="row cat-row" id="clothing">
                        {this.state.suitcase.Items
                          .filter(item => (item.item_category === "CLOTHING"))
                          .map((item, i) => (
                            <Item
                              key={i}
                              itemName={item.item_name}
                              itemCategory={item.item_category}
                            />
                          ))

                        }
                      </div>
                    </Category>


                    <Category>
                      <div className="title row">
                        <div>
                          <span className="badge badge-pill badge-info">Accessories</span>
                        </div>
                        <div>
                          <button data-category="accessories" className="all btn btn-primary btn-sm ml-3">Select all</button>
                        </div>
                      </div>
                      <div className="row cat-row" id="accessories">
                        {this.state.suitcase.Items
                          .filter(item => (item.item_category === "ACCESSORIES"))
                          .map((item, i) => (
                            <Item
                              key={i}
                              itemName={item.item_name}
                              itemCategory={item.item_category}
                            />
                          ))

                        }
                      </div>
                    </Category>


                    <Category>
                      <div className="title row">
                        <div>
                          <span className="badge badge-pill badge-info">Electronics</span>
                        </div>
                        <div>
                          <button data-category="electronics" className="all btn btn-primary btn-sm ml-3">Select all</button>
                        </div>
                      </div>
                      <div className="row cat-row" id="electronics">
                        {this.state.suitcase.Items
                          .filter(item => (item.item_category === "ELECTRONICS"))
                          .map((item, i) => (
                            <Item
                              key={i}
                              itemName={item.item_name}
                              itemCategory={item.item_category}
                            />
                          ))

                        }
                      </div>
                    </Category>

                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-6 mx-auto my-3 text-center">
                  <button id="add-items" className="btn btn-primary btn-lg">Add Selected Items To My Suitcase</button>
                </div>
                <div className="col-12 text-center" id="add-more-items-holder">
                  <a className="btn btn-lg btn-primary mt-3 mb-3 px-3 pb-2 pt-3" id="add-more-items" href="/items">

                    <p>See Full List of Items To Choose From</p>

                  </a>
                </div>
              </div>
            </div>
            <div className="yelp-wrapper">
              <Yelp />
            </div>
          </div>

        </Main>
        {this.renderNewSuitcaseModal()}
        {this.renderConfirmationModal()}
        <Footer />
      </div>
    )
  }
}
