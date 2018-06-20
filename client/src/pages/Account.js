import React, { Component } from 'react';

export default class Account extends Component {
  render() {
    return (
      <div className="account">
        { this.props.children }
      </div>
    )
  }
}
