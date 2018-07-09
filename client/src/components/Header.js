import React, { Component } from 'react';
import Navibar from "./Navbar";
import "../styles/Header.css";

export default class Header extends Component {
  render() {
    return (
      <header>
        <Navibar
          showNewSuitcaseModal={this.props.showNewSuitcaseModal}
          loggedInUserIdNumber={this.props.loggedInUserIdNumber}
          userDataId={this.props.userDataId}
        />
      </header>
    )
  }
}
