import React, { Component } from 'react';

export default class QuickViewItem extends Component {
  render() {
    return (
      <div className="form-check offset-1 col-5 col-lg-3">
        <div className="row justify-content-start">
          <div className="col">
            <label className="form-check-label">
              <input className="form-check-input" type="checkbox" onClick={() => this.props.handleSelected(this.props.itemId) } checked={this.props.selected} /> {this.props.itemName}
              <span className="form-check-sign">
                <span className="check" ></span>
              </span>
            </label>
          </div>
          <div className="col">
            <div className="number-display">
              {this.props.itemAmount}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
