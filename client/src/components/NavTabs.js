import React from "react";

const NavTabs = props => (
  <ul className="nav nav-tabs">

    <li className="nav-item">
      <a onClick={() => props.handlePageChange("SuitcaseItems")} className="nav-link"
      className={props.currentPage === "SuitcaseItems" ? "active nav-link" : "nav-link"}>
        <button className="all btn btn-primary btn-sm btn-fab btn-round">
          <i className="fa fa-suitcase" title="Contact"> </i>
        </button>
      </a>
    </li>

    <li className="nav-item">
      <a onClick={() => props.handlePageChange("Blog")} className="nav-link"
      className={props.currentPage === "Blog" ? "active nav-link" : "nav-link"}>
        <button className="all btn btn-warning btn-sm btn-fab btn-round">
          <i className="fa fa-pencil-square-o" title="Blog"> </i>
        </button>
      </a>
    </li>

  </ul>
);

export default NavTabs;
