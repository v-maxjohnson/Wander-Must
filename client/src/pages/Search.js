import React, { Component } from 'react';
import { Redirect, Link } from "react-router-dom";
import { withAlert } from 'react-alert';
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Items from "../pages/Items";
import QuickViewModal from '../components/QuickViewModal';
import SearchSuitcaseCard from "../components/SearchSuitcaseCard";
import "../styles/Search.css";
import gql from "graphql-tag";
import ApolloClient from 'apollo-boost';

const GET_SUITCASES_BY_LOCALE_QUERY = gql`
query getSuitcasesByLocale( $locale_city: String! ){
  getSuitcasesByLocale(locale_city: $locale_city) {
    id
    start_date
    end_date
    travel_category
    suitcase_image
    Locale {
      id
      locale_city
      locale_admin
      locale_country
    }
    User {
      id
      username
      gender
    }
    Items {
      id
      item_name
      item_category
      selected
      suitcase_items {
        item_amount
      }
    }
  }
}`;

const ADD_ITEM_TO_SUITCASE_MUTATION = gql`
mutation addItemToSuitcase( $id: ID, $item_ids: [ID] ) {
  addItemToSuitcase (id: $id, item_ids: $item_ids) {
      id
      Items {
        id
    }
  }
}`;

const client = new ApolloClient();

let cityNoUnderscores = "";

class Search extends Component {
  state = {
    suitcaseData: [
      {
        travel_category: "",
        suitcase_image: "",
        Locale: {
          id: "",
          locale_city: "",
          locale_admin: "",
          locale_country: ""
        },
        User: {
          id: "",
          username: "",
          gender: ""
        }
      }
    ],
    city: this.props.match.params.city,
    openQuickViewModal: false,
    rendered: false,
    index: null,
    suitcaseId: localStorage.getItem("suitcase_id"),
    loggedInUserIdNumber: localStorage.getItem("logged_in_user_id")
  }

  componentDidMount() {

    client.query({
      query: GET_SUITCASES_BY_LOCALE_QUERY,
      variables: { locale_city: this.state.city }
    }).then(result => {
      this.setState({ suitcaseData: result.data.getSuitcasesByLocale, rendered: true });
    })

  }

  renderCityWithoutUnderscores = () => {
    if (this.state.rendered) {
      cityNoUnderscores = this.state.suitcaseData[0].Locale.locale_city.replace(/_/g, ' ');
      return (
        cityNoUnderscores
      )
    }
  }

  showQuickViewModal = () => {
    this.setState({ openQuickViewModal: true });
  }

  resetQuickViewModal = () => {
    this.setState({ openQuickViewModal: false });
  }

  renderQuickViewModal = () => {
    if (this.state.openQuickViewModal) {
      return <QuickViewModal
        id={this.state.index}
        resetQuickViewModal={this.resetQuickViewModal}
        handleSelected={this.handleSelected}
        handleSelectAll={this.handleSelectAll}
        addItemsToSuitcase={this.addItemsToSuitcase}
      />
    }
  }

  setQuickViewModalIndex = (contentId) => {
    this.setState({ index: contentId })
    console.log(this.state.index, contentId)
  }

  addItemsToSuitcase = (itemsToAdd) => {
    if (itemsToAdd.length) {
      client.mutate({
        mutation: ADD_ITEM_TO_SUITCASE_MUTATION,
        variables: { id: this.state.suitcaseId, item_ids: itemsToAdd }
      }).then(result => {
        console.log(result);
        this.props.alert.show(<div className="success-alert">You added these items to your suitcase</div>);
      }).catch(err => console.log(err))
    }
  }

  mapOrRedirect = () => {
    let filteredArray = this.state.suitcaseData
      .filter(suitcase =>
        (suitcase.User.id !== this.state.loggedInUserIdNumber));

    if (filteredArray.length) {
      return (
        filteredArray.map((suitcase, i) => (
          <SearchSuitcaseCard
            key={i}
            idx={i}
            id={suitcase.id}
            city={suitcase.Locale.locale_city}
            localeAdmin={suitcase.Locale.locale_admin}
            country={suitcase.Locale.locale_country}
            suitcaseImage={suitcase.suitcase_image}
            startDate={suitcase.start_date}
            endDate={suitcase.end_date}
            category={suitcase.travel_category}
            userName={suitcase.User.username}
            gender={suitcase.User.gender}
            rendered={this.state.rendered}
            showQuickViewModal={this.showQuickViewModal}
            setQuickViewModalIndex={this.setQuickViewModalIndex}
          />
        )
        )
      )
    } else {
      return <Redirect to={"/items"} render={(props) => <Items {...props} />} />
    }
  }


  render() {
    return (
      <div className="search profile-page sidebar-collapse">

        <Header
          showNewSuitcaseModal={this.props.showNewSuitcaseModal}
          loggedInUserIdNumber={this.state.loggedInUserIdNumber}
        />
        <Main>
          <div className="page-header header-filter" data-parallax="true" id="background-search"></div>
          <div className="main main-raised">
            <div className="profile-content">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 col-lg-12 ml-auto mr-auto">
                    <div className="profile">

                      <div className="city-name">
                        <p>Here are some suitcases for
                <span className="locale-city"> {this.renderCityWithoutUnderscores()}</span>. Click on a suitcase and start adding items to yours!</p><p>Ready to head on down the road? Go straight to <Link to={"/suitcase/" + this.state.suitcaseId}>your suitcase!</Link></p>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {this.mapOrRedirect()}
                </div>
              </div>
            </div>
          </div>
        </Main>
        {this.renderQuickViewModal()}
        {this.props.renderNewSuitcaseModal()}
        <Footer />

      </div>
    )
  }
}

export default withAlert(Search);