import React, { Component } from 'react';

export default class Item extends Component {
  render() {
    return (
        <div class="form-check offset-1 col-5 col-lg-3">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" data-item-category="toiletries" data-item_id="" /> Toothpaste
        <span class="form-check-sign">
              <span class="check"></span>
            </span>
          </label>
        </div>
    )
  }
}
