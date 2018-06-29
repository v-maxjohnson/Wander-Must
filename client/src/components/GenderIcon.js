import React, { Component } from 'react';

export default class GenderIcon extends Component {
  render() {
    return (
      <div className="gendericon d-inline">
        <i className={this.props.genderIconClass}></i>
      </div>
    )
  }
}
