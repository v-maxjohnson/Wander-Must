import React, { Component } from 'react';
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchSuitcaseCard from "../components/SearchSuitcaseCard"
import "../styles/Search.css";
import gql from "graphql-tag";
import ApolloClient from 'apollo-boost';
import QuickViewModal from '../components/QuickViewModal';

const GET_SUITCASES_BY_LOCALE_QUERY = gql`
query getSuitcasesByLocale( $locale_city: String! ){
  getSuitcasesByLocale(locale_city: $locale_city) {
    id
    start_date
    end_date
    travel_category
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
    }
  }
}`;

const client = new ApolloClient();

export default class Search extends Component {
  state = {
    suitcaseData: [
      {
        travel_category: "",
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
    city: "austin",
    openQuickViewModal: false,
    rendered: false,
    index: 0
  }

  componentDidMount() {

    client.query({
      query: GET_SUITCASES_BY_LOCALE_QUERY,
      variables: { locale_city: this.state.city }
    }).then(result => {
      this.setState({ suitcaseData: result.data.getSuitcasesByLocale, rendered: true });
      console.log(this.state.suitcaseData)
    })

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
        quickViewData={this.state.suitcaseData[this.state.index]}
        resetQuickViewModal={this.resetQuickViewModal}
      />
    }
  }

  setQuickViewModalIndex = (idx) => {
    this.setState({ index: idx})
  }

  render() {
    return (
      <div className="search profile-page sidebar-collapse">
        <Header />
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
                <span className="locale-city"> {this.state.suitcaseData[0].Locale.locale_city}</span>. Click on a suitcase and start adding items to yours!</p>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {this.state.suitcaseData.map((suitcase, i) => (
                    <SearchSuitcaseCard
                      key={i}
                      idx={i}
                      id={suitcase.id}
                      city={suitcase.Locale.locale_city}
                      localeAdmin={suitcase.Locale.locale_admin}
                      country={suitcase.Locale.locale_country}
                      src={suitcase.Locale.locale_image}
                      startDate={suitcase.start_date}
                      endDate={suitcase.end_date}
                      category={suitcase.travel_category}
                      userName={suitcase.User.username}
                      gender={suitcase.User.gender}
                      rendered={this.state.rendered}
                      showQuickViewModal={this.showQuickViewModal}
                      setQuickViewModalIndex={this.setQuickViewModalIndex}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Main>
        {this.renderQuickViewModal()}
        <Footer />
        
      </div>
    )
  }
}
