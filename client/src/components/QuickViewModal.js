import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Moment from 'react-moment';
import Category from "../components/Category";
import QuickViewItem from "../components/QuickViewItem";
import gql from "graphql-tag";
import ApolloClient from 'apollo-boost';
import "../styles/QuickViewModal.css";

const GET_SUITCASE_QUERY = gql` 
query getSuitcase( $id: ID ){
  getSuitcase(id: $id) {
    id
    start_date
    end_date
    travel_category 
    note_title
    notes
    Items {
      id
      item_name
      item_category
      suitcase_items {
        item_amount
      }
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

const client = new ApolloClient();

let cityNoUnderscores = "";

export default class QuickViewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      rendered: false,
      modalSuitcase: {
        start_date: "",
        end_date: "",
        travel_category: "",
        Items: [],
        Locale: [],
        User: []
      }
    };
  }

  componentDidMount() {
    this.getSuitcase();
  }

  getSuitcase = () => {
    client.query({
      query: GET_SUITCASE_QUERY,
      variables: { id: this.props.id },
      fetchPolicy: "network-only"
    }).then(result => {
      this.setState({ modalSuitcase: result.data.getSuitcase, rendered: true });
    })
  }

  toggle = () => {
    this.props.resetQuickViewModal();
  }

  renderCityWithoutUnderscores = () => {
    if (this.state.rendered) {
      cityNoUnderscores = this.state.modalSuitcase.Locale.locale_city.replace(/_/g, ' ');
      return (
        cityNoUnderscores
      )
    }
  }

  showSuccessMessage = () => {
    this.setState({
      successMessage: true
    })
  }

  renderSuccessMessage = () => {
    if (this.state.successMessage) {
      return (
        <p>We've added these items to your suitcase!</p>
      )
    }
  }

  render() {
    return (
      <div>
        <Modal centered={true} isOpen={this.state.modal} toggle={this.toggle} className="quick-view-modal modal-lg">
          <ModalHeader toggle={this.toggle}>Wander-Must</ModalHeader>
          <div className="suitcase-header">
            <div id="suitcase-nav" className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">
                <ul className="nav suitcase-nav">
                  <li className="nav-item ">
                    <p className="nav-link" id="suitcase-user">{this.state.modalSuitcase.User.username}</p>
                  </li>
                  <li className="nav-item ">
                    <p className="nav-link" id="suitcase-user-gender"> {this.state.modalSuitcase.User.gender}</p>
                  </li>
                  <li className="nav-item ">
                    <p className="nav-link" id="suitcase-locale">{this.renderCityWithoutUnderscores()}
                    </p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link d-inline-block" id="suitcase-startDate">
                      <Moment format="MMM DD, YYYY">
                        {this.state.modalSuitcase.start_date}
                      </Moment>
                    </p>-
                  <p className="nav-link d-inline-block" id="suitcase-endDate">
                      <Moment format="MMM DD, YYYY">
                        {this.state.modalSuitcase.end_date}
                      </Moment>
                    </p>
                  </li>

                  <li className="nav-item">
                    <p className="nav-link" id="suitcase-travelCategory">{this.state.modalSuitcase.travel_category}</p>
                  </li>

                </ul>

              </div>
            </div>
          </div>

          <ModalBody>
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
                      {this.state.modalSuitcase.Items
                        .filter(item => (item.item_category === "TOILETRIES"))
                        .map((item, i) => (
                          <QuickViewItem
                            key={i}
                            itemId={item.id}
                            itemName={item.item_name}
                            itemCategory={item.item_category}
                            itemAmount={item.suitcase_items.item_amount}
                            itemsToAdd={this.props.itemsToAdd}
                            onCheckboxBtnClick={this.props.onCheckboxBtnClick}
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
                      {this.state.modalSuitcase.Items
                        .filter(item => (item.item_category === "CLOTHING"))
                        .map((item, i) => (
                          <QuickViewItem
                            key={i}
                            itemId={item.id}
                            itemName={item.item_name}
                            itemCategory={item.item_category}
                            itemAmount={item.suitcase_items.item_amount}
                            itemsToAdd={this.props.itemsToAdd}
                            onCheckboxBtnClick={this.props.onCheckboxBtnClick}
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
                      {this.state.modalSuitcase.Items
                        .filter(item => (item.item_category === "ACCESSORIES"))
                        .map((item, i) => (
                          <QuickViewItem
                            key={i}
                            itemId={item.id}
                            itemName={item.item_name}
                            itemCategory={item.item_category}
                            itemAmount={item.suitcase_items.item_amount}
                            itemsToAdd={this.props.itemsToAdd}
                            onCheckboxBtnClick={this.props.onCheckboxBtnClick}
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
                      {this.state.modalSuitcase.Items
                        .filter(item => (item.item_category === "ELECTRONICS"))
                        .map((item, i) => (
                          <QuickViewItem
                            key={i}
                            itemId={item.id}
                            itemName={item.item_name}
                            itemCategory={item.item_category}
                            itemAmount={item.suitcase_items.item_amount}
                            itemsToAdd={this.props.itemsToAdd}
                            onCheckboxBtnClick={this.props.onCheckboxBtnClick}
                          />
                        ))

                      }
                    </div>
                  </Category>

                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="justify-content-between pt-5">
            <div className="success-text">
              {this.renderSuccessMessage()}
            </div>
            <div>
              <button className="btn btn-primary btn-sm px-3 py-2 mr-2" onClick={() => { this.props.addItemsToSuitcase(); this.showSuccessMessage() }}>Add to suitcase</button>
              <button className="btn btn-info btn-sm px-3 py-2 mx-2" onClick={this.toggle}>Close</button>
            </div>
          </ModalFooter>
        </Modal >
      </div >
    );
  }
}
