import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
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
    id
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

const DELETE_SUITCASE_MUTATION = gql` 
mutation deleteSuitcase( $id: ID ){
    deleteSuitcase(id: $id) {
      id
    }
}`;

const ADD_ITEM_TO_SUITCASE_MUTATION = gql`
mutation addItemToSuitcase( $id: ID, $item_ids: [ID] ) {
  addItemToSuitcase (id: $id, item_ids: $item_ids) {
      id
      Items {
        id
    }
  }
}`;

const DELETE_ITEM_FROM_SUITCASE_MUTATION = gql`
mutation deleteItemFromSuitcase( $suitcase_id: ID, $item_id: ID ) {
  deleteItemFromSuitcase (suitcase_id: $suitcase_id, item_id: $item_id) {
      id
      Items {
        id
    }
  }
}`;

const client = new ApolloClient();

let cityNoUnderscores = "";
let autocompleteItems;
let renderAutoValue;


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
    thisSuitcaseId: this.props.match.params.id,
    currentSuitcaseId: localStorage.getItem("suitcase_id"),
    value: '',
    itemsToAdd: [],
    loggedInUserIdNumber: localStorage.getItem("logged_in_user_id")
  };

  componentDidMount() {

    this.lookupInterval = setInterval(() => {
      client.query({
        query: GET_SUITCASE_QUERY,
        variables: { id: this.state.thisSuitcaseId },
        fetchPolicy: "network-only"
      }).then(result => {
        this.setState({ suitcase: result.data.getSuitcase, rendered: true });
      })
    }, 500)

    client.query({
      query: gql` 
            { 
              allItems {
                id,
                item_name,
                item_category 
              }
            }`
    }).then(result => {
      this.setState({ allItems: result.data.allItems });
    })
  }

  componentWillUnMount() {
    clearInterval(this.lookupInterval)
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
            id={item.id}
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

  renderYelp = () => {
    if (this.state.rendered) {
      return (
        <div className="yelp-wrapper">
          <Yelp
            city={this.state.suitcase.Locale.locale_city}
            admin={this.state.suitcase.Locale.locale_admin}
            country={this.state.suitcase.Locale.locale_country}
          />
        </div>
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
      mutation: DELETE_SUITCASE_MUTATION,
      variables: { id: this.state.suitcase.id }
    }).then(result => {
      this.setState({
        shouldRedirectToProfile: true
      })
    })
  }

  addItemToSuitcase = () => {
    client.mutate({
      mutation: ADD_ITEM_TO_SUITCASE_MUTATION,
      variables: { id: this.state.suitcase.id, item_ids: this.state.itemsToAdd },
      fetchPolicy: "no-cache"
    }).then(result => {
      this.setState({ value: "", itemsToAdd: [] })
    }).catch(err => console.log(err))
  }

  addItemsToCurrentSuitcase = () => {
    client.mutate({
      mutation: ADD_ITEM_TO_SUITCASE_MUTATION,
      variables: { id: this.state.currentSuitcaseId, item_ids: this.state.itemsToAdd }
    }).then(result => {
      this.setState({
        shouldRedirectToCurrentSuitcase: true,
        itemsToAdd: [],
        thisSuitcaseId: this.props.match.params.id
      })
    }).catch(err => console.log(err))
  }

  deleteItemFromSuitcase = (itemId) => {
    client.mutate({
      mutation: DELETE_ITEM_FROM_SUITCASE_MUTATION,
      variables: { suitcase_id: this.state.suitcase.id, item_id: itemId },
      fetchPolicy: "no-cache"
    }).then(result => {
      console.log(itemId)
    }).catch(err => console.log(err))
  }

  maybeRedirect() {
    if (this.state.shouldRedirectToProfile) {
      return (
        <Redirect to={"/profile/" + this.state.loggedInUserIdNumber} render={(props) => <Profile {...props} />} />
      )
    }
  }

  setSuitcaseId = () => {
    localStorage.setItem("suitcase_id", this.state.suitcase.id);
  }

  onCheckboxBtnClick = (selected) => {
    const index = this.state.itemsToAdd.indexOf(selected);
    if (index < 0) {
      this.state.itemsToAdd.push(selected);
    } else {
      this.state.itemsToAdd.splice(index, 1);
    }
    this.setState({ itemsToAdd: [...this.state.itemsToAdd] });
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
                            <Link className="nav-link" id="suitcase-locale" to={"/search/" + this.state.suitcase.Locale.locale_city}>{this.renderCityWithoutUnderscores()}</Link>
                          </li>

                          {this.state.rendered ? (
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
                          ) : (
                              <li className="nav-item">
                                Loading . . .
                              </li>
                            )}

                          <li className="nav-item">
                            <p className="nav-link" id="suitcase-travelCategory">{this.state.suitcase.travel_category}</p>
                          </li>

                          <li className="nav-item">
                            <button data-category="suitcase" className="all btn btn-primary btn-sm btn-fab btn-round">
                              <i className="fa fa-suitcase" title="View this suitcase"> </i>
                            </button>
                          </li>

                          <li className="nav-item">
                            <button data-category="notes" className="all btn btn-default btn-sm btn-fab btn-round">
                              <i className="fa fa-pencil-square-o" title="View notes"> </i>
                            </button>
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

              {this.state.loggedInUserIdNumber === this.state.suitcase.User.id ? (
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
                    onSelect={(value, item) => this.setState({ value: value, itemsToAdd: [...this.state.itemsToAdd, item.id] })}
                  />
                  <div className="input-group-append">
                    <button type="button" onClick={() => { this.addItemToSuitcase() }}><i className="fa fa-search"></i> Add an item</button>
                  </div>
                </div>
              ) : (
                  <div></div>
                )}


              <div className="row">
                <div className="col-12">
                  <div id="items">

                    <Category>
                      <div className="title row">
                        <div>
                          <button data-category="toiletries" className="all btn btn-default btn-sm btn-fab btn-round">
                            <i className="fa fa-check-circle-o" title="Select all toiletries"> </i>
                          </button>
                        </div>
                        <div>
                          <span className="badge badge-pill badge-info">Toiletries</span>
                        </div>

                      </div>
                      <div className="row cat-row" id="toiletries">
                        {this.state.suitcase.Items
                          .filter(item => (item.item_category === "TOILETRIES"))
                          .map((item, i) => (
                            <Item
                              key={i}
                              itemId={item.id}
                              itemName={item.item_name}
                              itemCategory={item.item_category}
                              itemsToAdd={this.state.itemsToAdd}
                              onCheckboxBtnClick={this.onCheckboxBtnClick}
                              loggedInUserIdNumber={this.state.loggedInUserIdNumber}
                              suitcaseUserId={this.state.suitcase.User.id}
                              deleteItemFromSuitcase={this.deleteItemFromSuitcase}
                            />
                          ))
                        }
                      </div>
                    </Category>

                    <Category>
                      <div className="title row">
                        <div>
                          <button data-category="clothing" className="all btn btn-default btn-sm btn-fab btn-round">
                            <i className="fa fa-check-circle-o" title="Select all clothing"> </i>
                          </button>
                        </div>
                        <div>
                          <span className="badge badge-pill badge-primary">Clothing</span>
                        </div>

                      </div>
                      <div className="row cat-row" id="clothing">
                        {this.state.suitcase.Items
                          .filter(item => (item.item_category === "CLOTHING"))
                          .map((item, i) => (
                            <Item
                              key={i}
                              itemId={item.id}
                              itemName={item.item_name}
                              itemCategory={item.item_category}
                              itemsToAdd={this.state.itemsToAdd}
                              onCheckboxBtnClick={this.onCheckboxBtnClick}
                              loggedInUserIdNumber={this.state.loggedInUserIdNumber}
                              suitcaseUserId={this.state.suitcase.User.id}
                              deleteItemFromSuitcase={this.deleteItemFromSuitcase}
                            />
                          ))

                        }
                      </div>
                    </Category>


                    <Category>
                      <div className="title row">
                        <div>
                          <button data-category="accessories" className="all btn btn-default btn-sm btn-fab btn-round">
                            <i className="fa fa-check-circle-o" title="Select all accessories"> </i>
                          </button>
                        </div>
                        <div>
                          <span className="badge badge-pill badge-info">Accessories</span>
                        </div>

                      </div>
                      <div className="row cat-row" id="accessories">
                        {this.state.suitcase.Items
                          .filter(item => (item.item_category === "ACCESSORIES"))
                          .map((item, i) => (
                            <Item
                              key={i}
                              itemId={item.id}
                              itemName={item.item_name}
                              itemCategory={item.item_category}
                              itemsToAdd={this.state.itemsToAdd}
                              onCheckboxBtnClick={this.onCheckboxBtnClick}
                              loggedInUserIdNumber={this.state.loggedInUserIdNumber}
                              suitcaseUserId={this.state.suitcase.User.id}
                              deleteItemFromSuitcase={this.deleteItemFromSuitcase}
                            />
                          ))

                        }
                      </div>
                    </Category>


                    <Category>
                      <div className="title row">
                        <div>
                          <button data-category="electronics" className="all btn btn-default btn-sm btn-fab btn-round">
                            <i className="fa fa-check-circle-o" title="Select all electronics"> </i>
                          </button>
                        </div>
                        <div>
                          <span className="badge badge-pill badge-primary">Electronics</span>
                        </div>

                      </div>
                      <div className="row cat-row" id="electronics">
                        {this.state.suitcase.Items
                          .filter(item => (item.item_category === "ELECTRONICS"))
                          .map((item, i) => (
                            <Item
                              key={i}
                              itemId={item.id}
                              itemName={item.item_name}
                              itemCategory={item.item_category}
                              itemsToAdd={this.state.itemsToAdd}
                              onCheckboxBtnClick={this.onCheckboxBtnClick}
                              loggedInUserIdNumber={this.state.loggedInUserIdNumber}
                              suitcaseUserId={this.state.suitcase.User.id}
                              deleteItemFromSuitcase={this.deleteItemFromSuitcase}
                            />
                          ))

                        }
                      </div>
                    </Category>

                  </div>
                </div>
              </div>


              <div className="row">
                {this.state.loggedInUserIdNumber === this.state.suitcase.User.id ? (
                  <div className="col-12 text-center" id="add-more-items-holder">
                    <Link className="btn btn-lg btn-primary mt-5 mb-3 px-3 pb-2 pt-3" id="add-more-items" to="/items" onClick={() => { this.setSuitcaseId() }}>
                      <p>See Full List of Items To Choose From</p>
                    </Link>
                  </div>
                ) : (
                    <div className="col-6 mx-auto mt-5 mb-3 text-center">
                      <Link id="add-items" className="btn btn-primary btn-lg mt-5 mb-3 px-3 pb-2 pt-3" onClick={() => { this.addItemsToCurrentSuitcase() }} to={"/suitcase/" + this.state.currentSuitcaseId}>Add Selected Items To My Suitcase</Link>
                    </div>
                  )}
              </div>
            </div>
            {this.renderYelp()}
          </div>

        </Main>
        {this.renderNewSuitcaseModal()}
        {this.renderConfirmationModal()}
        <Footer />
      </div>
    )
  }
}
