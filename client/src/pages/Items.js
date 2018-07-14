import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withAlert } from 'react-alert';
import cloneDeep from 'lodash/cloneDeep';
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Category from "../components/Category";
import ListItem from "../components/ListItem";
import "../styles/Items.css";
import "../styles/Suitcase.css";
import gql from "graphql-tag";
import ApolloClient from 'apollo-boost';

const ADD_ITEM_TO_SUITCASE_MUTATION = gql`
mutation addItemToSuitcase( $id: ID, $item_ids: [ID] ) {
  addItemToSuitcase (id: $id, item_ids: $item_ids) {
      id
      Items {
        id
    }
  }
}`;

const client = new ApolloClient();

class Items extends Component {
  state = {
    items: [],
    itemsToAdd: [],
    suitcaseId: localStorage.getItem("suitcase_id"),
    loggedInUserIdNumber: localStorage.getItem("logged_in_user_id"),
    selectAllToiletries: false,
    selectAllClothing: false,
    selectAllAccessories: false,
    selectAllElectronics: false
  };

  componentDidMount() {

    client.query({
      query: gql` 
            { 
              allItems {
                id
                item_name
                item_category
                selected
              }
            }`
    }).then(result => {
      const clonedItems = cloneDeep(result.data.allItems);
      this.setState({ items: clonedItems });
    })
  }

  handleSelected = (selectedId) => {
    let tempSuitcase = [...this.state.items];

    tempSuitcase.map(item => {
      if (item.id === selectedId) {
        item.selected = !item.selected
      }
      return item;
    });

    this.setState({
      items: [...tempSuitcase],
      itemsToAdd: this.state.items.filter(item => item.selected).map(item => item.id)
    });

  }

  handleSelectAll = (e, category) => {
    let tempSuitcase = [...this.state.items];
    // if clicking on the button when the check is visible
    if (e.target.classList.contains('check-all')) {
      // check all of them
      tempSuitcase.map(item => {
        if (item.item_category === category) {
          item.selected = true;
        }
        return item;
      });

      this.setState({
        items: [...tempSuitcase],
        itemsToAdd: this.state.items.filter(item => item.selected).map(item => item.id)
      })
    }

    // if clicking on the button when the x is visible
    if (e.target.classList.contains('uncheck-all')) {
      // uncheck all of them
      tempSuitcase.map(item => {
        if (item.item_category === category) {
          item.selected = false;
        }
        return item;
      });

      this.setState({
        items: [...tempSuitcase],
        itemsToAdd: this.state.items.filter(item => item.selected).map(item => item.id)
      })
    }
  }

  addItemsToSuitcase = () => {
    if (this.state.itemsToAdd.length) {
    client.mutate({
      mutation: ADD_ITEM_TO_SUITCASE_MUTATION,
      variables: { id: this.state.suitcaseId, item_ids: this.state.itemsToAdd }
    }).then( () => {
      this.props.alert.show(<div className="success-alert">You added these items to your suitcase</div>);
    }).catch(err => console.log(err))
  }
  }

  toggleSelectAll = (category) => {
    switch (category) {
      case "toiletries":
        this.selectAllToiletries();
        break;
      case "clothing":
        this.selectAllClothing();
        break;
      case "accessories":
        this.selectAllAccessories();
        break;
      case "electronics":
        this.selectAllElectronics();
        break;
      default:
        break;
    }
  }

  selectAllToiletries = () => {
    this.setState({
      selectAllToiletries: !this.state.selectAllToiletries
    })
  }

  selectAllClothing = () => {
    this.setState({
      selectAllClothing: !this.state.selectAllClothing
    })
  }

  selectAllAccessories = () => {
    this.setState({
      selectAllAccessories: !this.state.selectAllAccessories
    })
  }

  selectAllElectronics = () => {
    this.setState({
      selectAllElectronics: !this.state.selectAllElectronics
    })
  }

  render() {
    return (
      <div className="items profile-page sidebar-collapse">
        <Header
          showNewSuitcaseModal={this.props.showNewSuitcaseModal}
          loggedInUserIdNumber={this.state.loggedInUserIdNumber}
        />
        <Main>
          <div className="page-header header-filter" data-parallax="true" id="background-items"></div>
          <div className="main main-raised">
            <div className="profile-content">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-lg-12 ml-auto mr-auto">
                    <div className="profile">

                    </div>
                  </div>
                </div>
                <div className="row text-center">
                  <div className="col-12">
                    <h2 className="wanderlust text-center">You are a true EXPLORER!</h2>
                    <h3 className="text-center">Scroll down and add more items to your packing list.</h3>
                    <img className="img-fluid animals" src="/assets/img/faces/suitcaseFriends.png" alt="animals" />
                  </div>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-12">
                <div id="items">

                  <Category>
                    <div className="title row">
                      <div>
                        <button className="all btn btn-default btn-sm btn-fab btn-round" onClick={(e) => { this.handleSelectAll(e, "TOILETRIES"); this.toggleSelectAll("toiletries") }}>
                          <i className={"fa " + (this.state.selectAllToiletries ? "fa-close uncheck-all" : "fa-check-circle-o check-all")} data-toggle="tooltip" title="Select all toiletries"> </i>
                        </button>
                      </div>
                      <div>
                        <span className="badge badge-pill badge-info">Toiletries</span>
                      </div>
                    </div>

                    <div className="row cat-row" id="toiletries">
                      {this.state.items
                        .filter(item => (item.item_category === "TOILETRIES"))
                        .map(item => (
                          <ListItem
                            key={item.item_name}
                            selected={item.selected}
                            itemId={item.id}
                            itemName={item.item_name}
                            itemCategory={item.item_category}
                            handleSelected={this.handleSelected}
                          />
                        ))}

                    </div>
                  </Category>

                  <Category>
                    <div className="title row">
                      <div>
                        <button className="all btn btn-default btn-sm btn-fab btn-round" onClick={(e) => { this.handleSelectAll(e, "CLOTHING"); this.toggleSelectAll("clothing") }}>
                          <i className={"fa " + (this.state.selectAllClothing ? "fa-close uncheck-all" : "fa-check-circle-o check-all")} data-toggle="tooltip" title="Select all toiletries"> </i>
                        </button>
                      </div>
                      <div>
                        <span className="badge badge-pill badge-primary">Clothing</span>
                      </div>
                    </div>

                    <div className="row cat-row" id="clothing">
                      {this.state.items
                        .filter(item => (item.item_category === "CLOTHING"))
                        .map(item => (
                          <ListItem
                            key={item.item_name}
                            selected={item.selected}
                            itemId={item.id}
                            itemName={item.item_name}
                            itemCategory={item.item_category}
                            handleSelected={this.handleSelected}
                          />
                        ))}

                    </div>
                  </Category>


                  <Category>
                    <div className="title row">
                      <div>
                        <button className="all btn btn-default btn-sm btn-fab btn-round" onClick={(e) => { this.handleSelectAll(e, "ACCESSORIES"); this.toggleSelectAll("accessories") }}>
                          <i className={"fa " + (this.state.selectAllAccessories ? "fa-close uncheck-all" : "fa-check-circle-o check-all")} data-toggle="tooltip" title="Select all toiletries"> </i>
                        </button>
                      </div>
                      <div>
                        <span className="badge badge-pill badge-info">Accessories</span>
                      </div>
                    </div>

                    <div className="row cat-row" id="accessories">
                      {this.state.items
                        .filter(item => (item.item_category === "ACCESSORIES"))
                        .map(item => (
                          <ListItem
                            key={item.item_name}
                            selected={item.selected}
                            itemId={item.id}
                            itemName={item.item_name}
                            itemCategory={item.item_category}
                            handleSelected={this.handleSelected}
                          />
                        ))}

                    </div>
                  </Category>


                  <Category>
                    <div className="title row">
                      <div>
                        <button className="all btn btn-default btn-sm btn-fab btn-round" onClick={(e) => { this.handleSelectAll(e, "ELECTRONICS"); this.toggleSelectAll("electronics") }}>
                          <i className={"fa " + (this.state.selectAllElectronics ? "fa-close uncheck-all" : "fa-check-circle-o check-all")} data-toggle="tooltip" title="Select all toiletries"> </i>
                        </button>
                      </div>
                      <div>
                        <span className="badge badge-pill badge-primary">Electronics</span>
                      </div>
                    </div>

                    <div className="row cat-row" id="electronics">
                      {this.state.items
                        .filter(item => (item.item_category === "ELECTRONICS"))
                        .map(item => (
                          <ListItem
                            key={item.item_name}
                            selected={item.selected}
                            itemId={item.id}
                            itemName={item.item_name}
                            itemCategory={item.item_category}
                            handleSelected={this.handleSelected}
                          />
                        ))}

                    </div>
                  </Category>

                </div>
              </div>

            </div>
            <div className="row">

              <div className="col-6 mx-auto mt-5 mb-3 text-center">
                <button id="add-items" className="btn btn-primary btn-lg mt-3 mb-3 mx-3 px-4 pb-3 pt-3" data-toggle="tooltip" title="Add to suitcase" data-placement="middle" onClick={() => this.addItemsToSuitcase()} ><i className="fa fa-plus"></i></button>

                <Link id="add-items" data-toggle="tooltip" title="Go to suitcase" data-placement="middle" className="btn btn-info btn-lg mt-3 mb-3 mx-3 px-4 pb-3 pt-3" to={"/suitcase/" + this.state.suitcaseId}><i className="fa fa-arrow-right"></i></Link>
              </div>

            </div>
          </div>

        </Main>
        {this.props.renderNewSuitcaseModal()}
        <Footer />
      </div >
    )
  }
}

export default withAlert(Items);
