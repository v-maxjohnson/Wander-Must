import React, { Component } from 'react';

export default class Suitcase extends Component {
  render() {
    return (
      <div className="suitcase">
        { this.props.children }
      </div>
    )
  }
}
