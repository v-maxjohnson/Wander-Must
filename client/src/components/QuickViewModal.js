import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Moment from 'react-moment';
import Category from "../components/Category";
import Item from "../components/Item";
import "../styles/QuickViewModal.css";

let cityNoUnderscores = "";

export default class QuickViewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };
  }

  toggle = () => {
    this.props.resetQuickViewModal();
  }

  renderCityWithoutUnderscores = () => {
    cityNoUnderscores = this.props.quickViewData.Locale.locale_city.replace(/_/g, ' ');
    return (
      cityNoUnderscores
    )
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
                    <p className="nav-link" id="suitcase-user">{this.props.quickViewData.User.username}</p>
                  </li>
                  <li className="nav-item ">
                    <p className="nav-link" id="suitcase-user-gender"> {this.props.quickViewData.User.gender}</p>
                  </li>
                  <li className="nav-item ">
                    <p className="nav-link" id="suitcase-locale">{this.renderCityWithoutUnderscores()}
                    </p>
                  </li>
                  <li className="nav-item">
                    <p className="nav-link d-inline-block" id="suitcase-startDate">
                      <Moment format="MMM DD, YYYY">
                        {this.props.quickViewData.start_date}
                      </Moment>
                    </p>-
                  <p className="nav-link d-inline-block" id="suitcase-endDate">
                      <Moment format="MMM DD, YYYY">
                        {this.props.quickViewData.end_date}
                      </Moment>
                    </p>
                  </li>

                  <li className="nav-item">
                    <p className="nav-link" id="suitcase-travelCategory">{this.props.quickViewData.travel_category}</p>
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
                      {this.props.quickViewData.Items
                        .filter(item => (item.item_category === "TOILETRIES"))
                        .map(item => (
                          <Item
                            key={item.item_name}
                            id={item.id}
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
                      {this.props.quickViewData.Items
                        .filter(item => (item.item_category === "CLOTHING"))
                        .map(item => (
                          <Item
                            key={item.item_name}
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
                      {this.props.quickViewData.Items
                        .filter(item => (item.item_category === "ACCESSORIES"))
                        .map(item => (
                          <Item
                            key={item.item_name}
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
                      {this.props.quickViewData.Items
                        .filter(item => (item.item_category === "ELECTRONICS"))
                        .map(item => (
                          <Item
                            key={item.item_name}
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
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary btn-sm px-3 py-2" onClick={this.toggle}>Close</button>
          </ModalFooter>
        </Modal >
      </div >
    );
  }
}
