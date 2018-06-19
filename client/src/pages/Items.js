import React, { Component } from 'react';

export default class Items extends Component {
  render() {
    return (
      <div className="items">
        { this.props.children }
      </div>
    )
  }
}
