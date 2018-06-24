import React, { Component } from 'react';

export default class Wunderground extends Component {
  render() {
    return (
      <div className="wunderground">
        { this.props.children }
      </div>
    )
  }
}
