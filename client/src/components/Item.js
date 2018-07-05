import React, { Component } from 'react';

export default class Item extends Component {
  render() {
    return (
      <div className="form-check offset-1 col-5 col-lg-3">
        {this.props.loggedInUserIdNumber === this.props.suitcaseUserId ? (
          <label className="form-check-label">
            <input className="form-check-input" type="checkbox" /> {this.props.itemName}
            <span onClick={() => { this.props.deleteItemFromSuitcase(this.props.itemId); }} className='fa fa-trash trash-icon'></span>
          </label>
        ) : (
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" onClick={() => this.props.onCheckboxBtnClick(this.props.itemId)} /> {this.props.itemName}
              <span className="form-check-sign">
                <span className="check" ></span>
              </span>
            </label>
          )
        }
      </div>
    )
  }
}
