import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Category from "../components/Category";
import ListItem from "../components/ListItem";
import Suitcase from "../pages/Suitcase";
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

export default class Items extends Component {
  state = {
    items: [],
    itemsToAdd: [],
    suitcaseId: localStorage.getItem("suitcase_id"),
    loggedInUserIdNumber: localStorage.getItem("logged_in_user_id")
  };

  componentDidMount() {

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
      this.setState({ items: result.data.allItems });
    })
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

  addItemsToSuitcase = () => {
    client.mutate({
      mutation: ADD_ITEM_TO_SUITCASE_MUTATION,
      variables: { id: this.state.suitcaseId, item_ids: this.state.itemsToAdd }
    }).then(result => {
      this.setState({
        shouldRedirectToSuitcase: true
      })
    }).catch(err => console.log(err))
  }
  
  maybeRedirect() {
    if (this.state.shouldRedirectToSuitcase) {
      return (
        <Redirect to={"/suitcase/" + this.state.suitcaseId} render={(props) => <Suitcase {...props} />} />
      )
    }
  }

  render() {
    return (
      <div className="items profile-page sidebar-collapse">
      {this.maybeRedirect()}
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
                    <img className="img-fluid animals" src="/assets/img/faces/animals.png" alt="animals" />
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
                        <button data-category="toiletries" className="all btn btn-default btn-sm btn-fab btn-round">
                          <i className="fa fa-check-circle-o" title="Select all toiletries"> </i>
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
                            itemId={item.id}
                            itemName={item.item_name}
                            itemCategory={item.item_category}
                            itemsToAdd={this.state.itemsToAdd}
                            onCheckboxBtnClick={this.onCheckboxBtnClick}
                          />
                        ))}

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
                      {this.state.items
                        .filter(item => (item.item_category === "CLOTHING"))
                        .map(item => (
                          <ListItem
                            key={item.item_name}
                            itemId={item.id}
                            itemName={item.item_name}
                            itemCategory={item.item_category}
                            itemsToAdd={this.state.itemsToAdd}
                            onCheckboxBtnClick={this.onCheckboxBtnClick}
                          />
                        ))}

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
                      {this.state.items
                        .filter(item => (item.item_category === "ACCESSORIES"))
                        .map(item => (
                          <ListItem
                            key={item.item_name}
                            itemId={item.id}
                            itemName={item.item_name}
                            itemCategory={item.item_category}
                            itemsToAdd={this.state.itemsToAdd}
                            onCheckboxBtnClick={this.onCheckboxBtnClick}
                          />
                        ))}

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
                      {this.state.items
                        .filter(item => (item.item_category === "ELECTRONICS"))
                        .map(item => (
                          <ListItem
                            key={item.item_name}
                            itemId={item.id}
                            itemName={item.item_name}
                            itemCategory={item.item_category}
                            itemsToAdd={this.state.itemsToAdd}
                            onCheckboxBtnClick={this.onCheckboxBtnClick}
                          />
                        ))}

                    </div>
                  </Category>

                </div>
              </div>

            </div>
            <div className="row">
              <div className="col-6 mx-auto my-3 text-center">
                  <button id="add-items" className="btn btn-primary btn-lg" onClick={() => { this.addItemsToSuitcase() }}>Add Selected Items To My Suitcase</button>
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
