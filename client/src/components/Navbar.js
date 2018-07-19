import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from "reactstrap";
import { Redirect, Link } from "react-router-dom";
import Login from "./Login";
import "../styles/Navbar.css";
import gql from "graphql-tag";
import ApolloClient from 'apollo-boost';
// import Autocomplete from 'react-autocomplete';

const GET_USER_QUERY = gql`
query getUser( $id: ID ){
  getUser(id: $id) {
    username
  }
}`;

const client = new ApolloClient();

// let autocompleteLocales;
// let renderAutoValue;
let localeNoUnderscores = "";

export default class Navibar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      loggedInUserIdNumber: localStorage.getItem("logged_in_user_id"),
      userName: "",
      allLocales: [],
      value: '',
      activeClass: "navbar-transparent",
    };
  }

  componentDidMount() {
    // client.query({
    //   query: gql` 
    //         { 
    //           allLocales {
    //             id,
    //             locale_city,
    //             locale_admin,
    //             locale_country 
    //           }
    //         }`
    // }).then(result => {
    //   this.setState({ allLocales: result.data.allLocales });
    // })

    if ("logged_in_user_id" in localStorage && this.state.loggedInUserIdNumber !== "") {
      client.query({
        query: GET_USER_QUERY,
        variables: { id: this.state.loggedInUserIdNumber },
        fetchPolicy: "network-only"
      })
        .then(result => {
        this.setState({ userName: result.data.getUser.username });
        })
    }
    window.addEventListener('scroll', this.listenScrollEvent)
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.listenScrollEvent)
  }

  listenScrollEvent = () => {
    if (window.scrollY > 100) {
      this.setState({ activeClass: "bg-white" })
    } 
    else {
      this.setState({ activeClass: "navbar-transparent" })
    }
  }

  renderCityWithoutUnderscores = () => {
    if (this.state.rendered) {
      localeNoUnderscores = this.state.suitcase.Locale.locale_city.replace(/_/g, ' ');
      return (
        localeNoUnderscores
      )
    }
  }

  // setAutocompleteLocales = () => {
  //   if (this.state.value !== "") {
  //     autocompleteLocales =
  //       this.state.allLocales
  //         .map((locale, i) => (
  //           { key: i, id: locale.id, label: locale.locale_city.replace(/_/g, ' '), admin: locale.locale_admin.replace(/_/g, ' ').toUpperCase(), country: locale.locale_country.replace(/_/g, ' ').toUpperCase() }
  //         ))
  //   } else {
  //     autocompleteLocales =
  //       [
  //         { key: "01", label: '' },
  //       ]
  //   }
  //   return autocompleteLocales
  // }

  // renderAutocomplete = () => {
  //   if (this.state.value !== "") {
  //     renderAutoValue =
  //       (locale, highlighted) =>
  //         <div
  //           key={locale.key}
  //           id={locale.id}
  //           style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
  //         >
  //           {locale.label}, {locale.admin}, {locale.country}
  //         </div>
  //   } else {
  //     renderAutoValue =
  //       (locale) =>
  //         <div
  //           key={locale.key}
  //         >
  //         </div>
  //   }
  //   return renderAutoValue
  // }

  renderProfileOrSettingsLink = () => {

    if (window.location.href.indexOf("profile") > -1 && this.props.userDataId === this.state.loggedInUserIdNumber) {
      return (
        <Link id="settings-link-button" className="nav-link" to="/account">
          <i className="fa fa-cog" title="Account Settings"> </i>
        </Link>
      )
    } else {
      return (
        <Link id="profile-link-button" className="nav-link" to={"/profile/" + this.state.loggedInUserIdNumber}>
          <i className="fa fa-user-circle" title="Profile Page"> </i>
        </Link>
      )
    }
  }

  renderNavItems = () => {
    if ("logged_in_user_id" in localStorage && this.state.loggedInUserIdNumber !== "") {
      return (
        <Nav className="navbar-nav ml-auto" navbar>
          {/* <NavItem>
            <div className="input-group auto-locales">
              <Autocomplete

                items={this.setAutocompleteLocales()}
                shouldItemRender={(locale, value) => locale.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={locale => locale.label}
                renderItem={this.renderAutocomplete()}
                wrapperStyle={
                  {
                    position: 'relative',
                    zIndex: 9999
                  }
                }
                menuStyle={
                  {
                    position: 'absolute',
                    cursor: "pointer",
                    top: "35px",
                    left: 0,
                    backgroundColor: "white",
                    color: "black"
                  }
                }
                value={this.state.value}
                onChange={e => this.setState({ value: e.target.value })}
                onSelect={(value) => this.setState({ value: value })}
              />
              <div className="input-group-append">
                <button type="button" className="search-for-city"><i className="fa fa-search"></i></button>
              </div>
            </div>
          </NavItem> */}
          <NavItem id="user-name-link" className="nav-item">
            <p className="nav-link" id="user-name-text">Hello, <Link className="nav-link-link" to="/account">{this.state.userName}</Link> !</p>

          </NavItem>
          <NavItem className="nav-item">
            {this.renderProfileOrSettingsLink()}
          </NavItem>

          <NavItem className="nav-item">
            <span className="suitcase-input" onClick={() => this.props.showNewSuitcaseModal()}>
              <a className="nav-link" data-toggle="tooltip" title="Add new Suitcase" data-placement="middle" data-original-title="Add new suitcase">
                <i className="fa fa-suitcase" data-toggle="tooltip" title="Add new Suitcase"> </i>
              </a>
            </span>
          </NavItem>

          <NavItem className="nav-item">
            <button className="btn btn-primary btn-sm px-3 py-2" id="logout-btn" onClick={ this.handleLogout } >Logout</button>
          </NavItem>
        </Nav >
      )
    } else {
      return (
        <Nav className="navbar-nav ml-auto" navbar>
          <NavItem className="nav-item">
            <Login />
          </NavItem>
        </Nav>)
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout = event => {
    event.preventDefault();
    localStorage.clear();
    this.setState({isAuthenticated : false})
    // fetch("logout", { method: "GET" })
    //   .then(
    //     this.setState({
    //       isAuthenticated: false
    //     }
    //     )
    //   )
  }

  maybeLogout() {
    if (this.state.isAuthenticated === false) { return (<Redirect to="/" />) }
  }

  render() {
    return (
      <div>
        {this.maybeLogout()}
        <Navbar className={`navbar ${this.state.activeClass} ${this.state.isOpen ? "nav-open" : "" } fixed-top navbar-expand-lg`}>
          <div className="container">
            <div className="navbar-translate">
              <Link to="/" className="navbar-brand wandermust-font nav-link">Wander-Must</Link>
              <NavbarToggler onClick={this.toggle}>
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
                <span className="navbar-toggler-icon"></span>
              </NavbarToggler>
            </div>
            <Collapse isOpen={this.state.isOpen} navbar>
              {this.renderNavItems()}
            </Collapse>

          </div>
        </Navbar>
      </div>

    )
  }
}