import React, { Component } from 'react';

export default class NavTabs extends Component {
  render() {
    return (

      <ul>
        <li className="nav-item d-inline-block">
          <a onClick={() => this.props.handlePageChange("SuitcaseItems")} className="nav-link"
          className={this.props.currentPage === "SuitcaseItems" ? "active nav-link" : "nav-link"}>
            <button className="all btn btn-primary btn-sm btn-fab btn-round">
              <i className="fa fa-suitcase" title="Contact"> </i>
            </button>
          </a>
        </li>

        <li className="nav-item d-inline-block">
          <a onClick={() => this.props.handlePageChange("Blog")} className="nav-link"
          className={this.props.currentPage === "Blog" ? "active nav-link" : "nav-link"}>
            <button className="all btn btn-warning btn-sm btn-fab btn-round">
              <i className="fa fa-pencil-square-o" title="Blog"> </i>
            </button>
          </a>
        </li>
      </ul>
      

    )
  }
}