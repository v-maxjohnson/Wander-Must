import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';

export default class Item extends Component {
  render() {
    return (
      <div className="form-check offset-1 col-5 col-lg-3">
        {this.props.loggedInUserIdNumber === this.props.suitcaseUserId ? (
          <div className="row justify-content-start">
            <div className="col">
              <label className="form-check-label">
                <input className="form-check-input" type="checkbox" /> {this.props.itemName}
                <span onClick={() => { this.props.deleteItemFromSuitcase(this.props.itemId) }} className='fa fa-trash trash-icon'></span>
              </label>
            </div>
            <div className="col">
              <NumericInput
                ref={r => this.numericValue = r}
                onChange={() => this.props.updateItemAmountOnSuitcase(this.props.itemId, this.numericValue.refsInput.value)}
                className="number-toggle"
                min={1}
                max={100}
                value={this.props.itemAmount}
                mobile
                strict
                size="1"
                style={{
                  wrap: {
                    borderRadius: '3px',
                    border: "1px solid transparent"
                  },
                  input: {
                    border: "none",
                    color: 'black',
                    paddingTop: "3px",
                    paddingBottom: "3px",
                    background: "transparent"
                  },
                  btnUp: {
                    background: "transparent",
                    cursor: "pointer",
                    border: "none"
                  },
                  btnDown: {
                    background: "transparent",
                    cursor: "pointer",
                    border: "none"
                  }
                }}
              />
            </div>
          </div>
        ) : (
            <div className="row justify-content-start">
              <div className="col">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" onClick={() => this.props.onCheckboxBtnClick(this.props.itemId)} /> {this.props.itemName}
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



          )
        }
      </div>
    )
  }
}
