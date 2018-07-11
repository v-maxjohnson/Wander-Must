import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Item from "../components/Item";
import Category from "../components/Category";


export default class SuitcaseItems extends Component {

  state = {
    selectAllToiletries: false,
    selectAllClothing: false,
    selectAllAccessories: false,
    selectAllElectronics: false
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
      <div className="suitcaseitems">
        <div className="row">
          <div className="col-12">
            <div id="items">

              <Category>
                <div className="title row">
                  <div>
                    <button className="all btn btn-default btn-sm btn-fab btn-round" onClick={() => { this.props.handleSelectAll("TOILETRIES"); this.toggleSelectAll("toiletries") }}>
                      <i className={"fa " + (this.state.selectAllToiletries ? "fa-close" : "fa-check-circle-o")} data-toggle="tooltip" title="Select all toiletries"> </i>
                    </button>
                  </div>
                  <div>
                    <span className="badge badge-pill badge-info">Toiletries</span>
                  </div>

                </div>
                <div className="row cat-row" id="toiletries">
                  {this.props.suitcaseItems
                    .filter(item => (item.item_category === "TOILETRIES"))
                    .map((item, i) => (
                      <Item
                        key={i}
                        selected={item.selected}
                        itemId={item.id}
                        itemName={item.item_name}
                        itemCategory={item.item_category}
                        itemAmount={item.suitcase_items.item_amount}
                        itemsToAdd={this.props.itemsToAdd}
                        handleSelected={this.props.handleSelected}
                        loggedInUserIdNumber={this.props.loggedInUserIdNumber}
                        suitcaseUserId={this.props.suitcase.User.id}
                        deleteItemFromSuitcase={this.props.deleteItemFromSuitcase}
                        updateItemAmountOnSuitcase={this.props.updateItemAmountOnSuitcase}
                        selectAll={this.state.selectAllToiletries}
                      />
                    ))
                  }
                </div>
              </Category>

              <Category>
                <div className="title row">
                  <div>
                    <button className="all btn btn-default btn-sm btn-fab btn-round" onClick={() => { this.props.handleSelectAll("CLOTHING"); this.toggleSelectAll("clothing") }}>
                      <i className={"fa " + (this.state.selectAllClothing ? "fa-close" : "fa-check-circle-o")} data-toggle="tooltip" title="Select all toiletries"> </i>
                    </button>
                  </div>
                  <div>
                    <span className="badge badge-pill badge-primary">Clothing</span>
                  </div>

                </div>
                <div className="row cat-row" id="clothing">
                  {this.props.suitcaseItems
                    .filter(item => (item.item_category === "CLOTHING"))
                    .map((item, i) => (
                      <Item
                        key={i}
                        selected={item.selected}
                        itemId={item.id}
                        itemName={item.item_name}
                        itemCategory={item.item_category}
                        itemAmount={item.suitcase_items.item_amount}
                        itemsToAdd={this.props.itemsToAdd}
                        handleSelected={this.props.handleSelected}
                        loggedInUserIdNumber={this.props.loggedInUserIdNumber}
                        suitcaseUserId={this.props.suitcase.User.id}
                        deleteItemFromSuitcase={this.props.deleteItemFromSuitcase}
                        updateItemAmountOnSuitcase={this.props.updateItemAmountOnSuitcase}
                        selectAll={this.state.selectAllClothing}
                      />
                    ))

                  }
                </div>
              </Category>


              <Category>
                <div className="title row">
                  <div>
                    <button className="all btn btn-default btn-sm btn-fab btn-round" onClick={() => { this.props.handleSelectAll("ACCESSORIES"); this.toggleSelectAll("accessories") }}>
                      <i className={"fa " + (this.state.selectAllAccessories ? "fa-close" : "fa-check-circle-o")} data-toggle="tooltip" title="Select all toiletries"> </i>
                    </button>
                  </div>
                  <div>
                    <span className="badge badge-pill badge-info">Accessories</span>
                  </div>

                </div>
                <div className="row cat-row" id="accessories">
                  {this.props.suitcaseItems
                    .filter(item => (item.item_category === "ACCESSORIES"))
                    .map((item, i) => (
                      <Item
                        key={i}
                        selected={item.selected}
                        itemId={item.id}
                        itemName={item.item_name}
                        itemCategory={item.item_category}
                        itemAmount={item.suitcase_items.item_amount}
                        itemsToAdd={this.props.itemsToAdd}
                        handleSelected={this.props.handleSelected}
                        loggedInUserIdNumber={this.props.loggedInUserIdNumber}
                        suitcaseUserId={this.props.suitcase.User.id}
                        deleteItemFromSuitcase={this.props.deleteItemFromSuitcase}
                        updateItemAmountOnSuitcase={this.props.updateItemAmountOnSuitcase}
                        selectAll={this.state.selectAllAccessories}
                      />
                    ))

                  }
                </div>
              </Category>


              <Category>
                <div className="title row">
                  <div>
                    <button className="all btn btn-default btn-sm btn-fab btn-round" onClick={() => { this.props.handleSelectAll("ELECTRONICS"); this.toggleSelectAll("electronics") } }>
                      <i className={"fa " + (this.state.selectAllElectronics ? "fa-close" : "fa-check-circle-o")} data-toggle="tooltip" title="Select all toiletries"> </i>
                    </button>
                  </div>
                  <div>
                    <span className="badge badge-pill badge-primary">Electronics</span>
                  </div>

                </div>
                <div className="row cat-row" id="electronics">
                  {this.props.suitcaseItems
                    .filter(item => (item.item_category === "ELECTRONICS"))
                    .map((item, i) => (
                      <Item
                        key={i}
                        selected={item.selected}
                        itemId={item.id}
                        itemName={item.item_name}
                        itemCategory={item.item_category}
                        itemAmount={item.suitcase_items.item_amount}
                        itemsToAdd={this.props.itemsToAdd}
                        handleSelected={this.props.handleSelected}
                        loggedInUserIdNumber={this.props.loggedInUserIdNumber}
                        suitcaseUserId={this.props.suitcase.User.id}
                        deleteItemFromSuitcase={this.props.deleteItemFromSuitcase}
                        updateItemAmountOnSuitcase={this.props.updateItemAmountOnSuitcase}
                        selectAll={this.state.selectAllElectronics}
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
                <button id="add-items" className="btn btn-primary btn-lg mt-3 mb-3 mx-3 px-4 pb-3 pt-3" data-toggle="tooltip" title="Add to suitcase" data-placement="middle" onClick={() => { this.props.addItemsToCurrentSuitcase() }} ><i className="fa fa-plus"></i></button>
                <Link id="add-items" data-toggle="tooltip" title="Go to suitcase" data-placement="middle" className="btn btn-info btn-lg mt-3 mb-3 mx-3 px-4 pb-3 pt-3" to={"/suitcase/" + this.props.currentSuitcaseId}><i className="fa fa-arrow-right"></i></Link>
              </div>
            )}
        </div>
        {this.props.renderYelp()}


      </div>
    )
  }
}