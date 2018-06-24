import React, { Component } from 'react';

export default class Category extends Component {
  render() {
    return (
      <div className="row">
        <div className="offset-1 col-11">
          { this.props.children }
        </div>
      </div>
    )
  }
}
