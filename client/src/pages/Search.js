import React, { Component } from 'react';

export default class Search extends Component {
  render() {
    return (
      <div className="search">
        { this.props.children }
      </div>
    )
  }
}
