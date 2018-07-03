import React, { Component } from 'react';

export default class Item extends Component {
  render() {
    return (
      <div className="form-check offset-1 col-5 col-lg-3">
        <label className="form-check-label">
          <input className="form-check-input" type="checkbox" data-item-category={this.props.itemCategory} data-item_id="" /> {this.props.itemName}
          {this.props.loggedInUserIdNumber === this.props.suitcaseUserId ? (
            <span className='fa fa-trash trash-icon'></span>
          ) : (
              <span className="form-check-sign">
                <span className="check"></span>
              </span>
            )
          }
        </label>
      </div>
    )
  }
}
