import React, { Component } from 'react';

export default class Signup extends Component {
  render() {
    return (
      <div className="signup">
        { this.props.children }
      </div>
    )
  }
}
