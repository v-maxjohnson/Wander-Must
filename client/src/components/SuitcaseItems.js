import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Item from "../components/Item";
import Category from "../components/Category";

export default class SuitcaseItems extends Component {
  render() {
    return (
      <div className="suitcaseitems">
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
                  {this.props.suitcase.Items
                    .filter(item => (item.item_category === "TOILETRIES"))
                    .map((item, i) => (
                      <Item
                        key={i}
                        itemId={item.id}
                        itemName={item.item_name}
                        itemCategory={item.item_category}
                        itemsToAdd={this.props.itemsToAdd}
                        onCheckboxBtnClick={this.props.onCheckboxBtnClick}
                        loggedInUserIdNumber={this.props.loggedInUserIdNumber}
                        suitcaseUserId={this.props.suitcase.User.id}
                        deleteItemFromSuitcase={this.props.deleteItemFromSuitcase}
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
                  {this.props.suitcase.Items
                    .filter(item => (item.item_category === "CLOTHING"))
                    .map((item, i) => (
                      <Item
                        key={i}
                        itemId={item.id}
                        itemName={item.item_name}
                        itemCategory={item.item_category}
                        itemsToAdd={this.props.itemsToAdd}
                        onCheckboxBtnClick={this.props.onCheckboxBtnClick}
                        loggedInUserIdNumber={this.props.loggedInUserIdNumber}
                        suitcaseUserId={this.props.suitcase.User.id}
                        deleteItemFromSuitcase={this.props.deleteItemFromSuitcase}
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
                  {this.props.suitcase.Items
                    .filter(item => (item.item_category === "ACCESSORIES"))
                    .map((item, i) => (
                      <Item
                        key={i}
                        itemId={item.id}
                        itemName={item.item_name}
                        itemCategory={item.item_category}
                        itemsToAdd={this.props.itemsToAdd}
                        onCheckboxBtnClick={this.props.onCheckboxBtnClick}
                        loggedInUserIdNumber={this.props.loggedInUserIdNumber}
                        suitcaseUserId={this.props.suitcase.User.id}
                        deleteItemFromSuitcase={this.props.deleteItemFromSuitcase}
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
                  {this.props.suitcase.Items
                    .filter(item => (item.item_category === "ELECTRONICS"))
                    .map((item, i) => (
                      <Item
                        key={i}
                        itemId={item.id}
                        itemName={item.item_name}
                        itemCategory={item.item_category}
                        itemsToAdd={this.props.itemsToAdd}
                        onCheckboxBtnClick={this.props.onCheckboxBtnClick}
                        loggedInUserIdNumber={this.props.loggedInUserIdNumber}
                        suitcaseUserId={this.props.suitcase.User.id}
                        deleteItemFromSuitcase={this.props.deleteItemFromSuitcase}
                      />
                    ))

                  }
                </div>
              </Category>

            </div>
          </div>
        </div>

        <div className="row">
          {this.props.loggedInUserIdNumber === this.props.suitcase.User.id ? (
            <div className="col-12 text-center" id="add-more-items-holder">
              <Link className="btn btn-lg btn-primary mt-5 mb-3 px-3 pb-2 pt-3" id="add-more-items" to="/items" onClick={() => { this.props.setSuitcaseId() }}>
                <p>See Full List of Items To Choose From</p>
              </Link>
            </div>
          ) : (
              <div className="col-6 mx-auto mt-5 mb-3 text-center">
                <Link id="add-items" className="btn btn-primary btn-lg mt-5 mb-3 px-3 pb-2 pt-3" onClick={() => { this.props.addItemsToCurrentSuitcase() }} to={"/suitcase/" + this.props.currentSuitcaseId}>Add Selected Items To My Suitcase</Link>
              </div>
            )}
        </div>
        {this.props.renderYelp()}
      </div>
    )
  }
}
