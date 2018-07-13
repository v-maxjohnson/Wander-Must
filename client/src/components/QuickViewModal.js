import React, { Component } from 'react';
import { Link } from "react-router-dom";
import cloneDeep from 'lodash/cloneDeep';
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
      selected
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
      },
      itemsToAdd: [],
      modalSuitcaseItems: [],
      selectAllToiletries: false,
      selectAllClothing: false,
      selectAllAccessories: false,
      selectAllElectronics: false
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
      const clonedSuitcase = cloneDeep(result.data.getSuitcase);
      const clonedSuitcaseItems = cloneDeep(result.data.getSuitcase.Items);
      this.setState({ modalSuitcase: clonedSuitcase, modalSuitcaseItems: clonedSuitcaseItems, rendered: true });
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

  handleSelected = (selectedId) => {
    let tempSuitcase = [...this.state.modalSuitcaseItems];

    tempSuitcase.map(item => {
      if (item.id === selectedId) {
        item.selected = !item.selected
      }
      return item;
    });

    this.setState({
      modalSuitcaseItems: [...tempSuitcase],
      itemsToAdd: this.state.modalSuitcaseItems.filter(item => item.selected).map(item => item.id)
    });

  }

  handleSelectAll = (e, category) => {
    console.log(e.target.classList);
    let tempSuitcase = [...this.state.modalSuitcaseItems];
    // if clicking on the button when the check is visible
    if (e.target.classList.contains('check-all')) {
      console.log('sanity check: inside check-all handler');
      // check all of them
      tempSuitcase.map(item => {
        if (item.item_category === category) {
          item.selected = true;
        }
        return item;
      });

      this.setState({
        modalSuitcaseItems: [...tempSuitcase],
        itemsToAdd: this.state.modalSuitcaseItems.filter(item => item.selected).map(item => item.id)
      })
    }

    // if clicking on the button when the x is visible
    if (e.target.classList.contains('uncheck-all')) {
      console.log('sanity check: inside uncheck-all handler');
      // uncheck all of them
      tempSuitcase.map(item => {
        if (item.item_category === category) {
          item.selected = false;
        }
        return item;
      });

      this.setState({
        modalSuitcaseItems: [...tempSuitcase],
        itemsToAdd: this.state.modalSuitcaseItems.filter(item => item.selected).map(item => item.id)
      })
    }
  }

  render() {
    return (
      <div>
        {console.log(this.state.itemsToAdd)}
        <Modal centered={true} isOpen={this.state.modal} toggle={this.toggle} className="quick-view-modal modal-lg">
          <ModalHeader toggle={this.toggle}>Wander-Must</ModalHeader>
          <div className="suitcase-header">
            <Link className="header-link" to={"/suitcase/" + this.props.id}>Go to this suitcase <i className="fa fa-arrow-right"></i></Link>
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
                        <button className="all btn btn-default btn-sm btn-fab btn-round" onClick={(e) => { this.handleSelectAll(e, "TOILETRIES"); this.toggleSelectAll("toiletries") }}>
                          <i className={"fa " + (this.state.selectAllToiletries ? "fa-close uncheck-all" : "fa-check-circle-o check-all")} data-toggle="tooltip" title="Select all toiletries"> </i>
                        </button>
                      </div>
                      <div>
                        <span className="badge badge-pill badge-info">Toiletries</span>
                      </div>
                    </div>
                    <div className="row cat-row" id="toiletries">
                      {this.state.modalSuitcaseItems
                        .filter(item => (item.item_category === "TOILETRIES"))
                        .map((item, i) => (
                          <QuickViewItem
                            key={i}
                            selected={item.selected}
                            itemId={item.id}
                            itemName={item.item_name}
                            itemCategory={item.item_category}
                            itemAmount={item.suitcase_items.item_amount}
                            handleSelected={this.handleSelected}
                            onCheckboxBtnClick={this.props.onCheckboxBtnClick}
                          />
                        ))
                      }
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
                      {this.state.modalSuitcaseItems
                        .filter(item => (item.item_category === "CLOTHING"))
                        .map((item, i) => (
                          <QuickViewItem
                            key={i}
                            selected={item.selected}
                            itemId={item.id}
                            itemName={item.item_name}
                            itemCategory={item.item_category}
                            itemAmount={item.suitcase_items.item_amount}
                            handleSelected={this.handleSelected}
                            onCheckboxBtnClick={this.props.onCheckboxBtnClick}
                          />
                        ))

                      }
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
                      {this.state.modalSuitcaseItems
                        .filter(item => (item.item_category === "ACCESSORIES"))
                        .map((item, i) => (
                          <QuickViewItem
                            key={i}
                            selected={item.selected}
                            itemId={item.id}
                            itemName={item.item_name}
                            itemCategory={item.item_category}
                            itemAmount={item.suitcase_items.item_amount}
                            handleSelected={this.handleSelected}
                            onCheckboxBtnClick={this.props.onCheckboxBtnClick}
                          />
                        ))

                      }
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
                      {this.state.modalSuitcaseItems
                        .filter(item => (item.item_category === "ELECTRONICS"))
                        .map((item, i) => (
                          <QuickViewItem
                            key={i}
                            selected={item.selected}
                            itemId={item.id}
                            itemName={item.item_name}
                            itemCategory={item.item_category}
                            itemAmount={item.suitcase_items.item_amount}
                            handleSelected={this.handleSelected}
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
          <ModalFooter className="justify-content-end pt-5">
            <button className="btn btn-primary btn-sm px-3 py-2 mr-2" onClick={() => this.props.addItemsToSuitcase(this.state.itemsToAdd)}>Add to suitcase</button>
            <button className="btn btn-info btn-sm px-3 py-2 mx-2" onClick={this.toggle}>Close</button>
          </ModalFooter>
        </Modal >
      </div >
    );
  }
}
