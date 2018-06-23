import React, { Component } from 'react';
import Main from "../components/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SuitcaseCard from "../components/SuitcaseCard"
import SuitcaseFrame from "../images/suitcaseFrame.png"
import "../styles/Profile.css";

export default class Profile extends Component {
  constructor (props) {
    super(props);
    this.state = {
      id: 1,
      profileImage: 'https://i.pinimg.com/originals/28/d9/0f/28d90fd67bf5c470c41b5ae24a923c68.png',
      suitcases: [
        {
          id: 1,
          locale: {
            locale_city: 'Cairo',
            locale_country: 'Egypt',
            locale_image : 'https://c1.staticflickr.com/7/6166/6243474310_28de45b86e_b.jpg',
            locale_admin : 'bull shit',
          },
          start_date: 'now',
          end_date: 'never',
          category: 'liesure',
        },
        {
          id: 2,
          locale: {
            locale_city: 'Madrid',
            locale_country: 'Spain',
            locale_image : 'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/EQ8Uu6D/madrid-city-skyline-timelapse-from-day-to-night-aerial-view-of-four-towers-business-area_blcpgr6ze_thumbnail-full07.png',
            locale_admin : 'bull shit',
          },
          start_date: '5-2-17',
          end_date: '6-2-18',
          category: 'liesure',
        }
      ]
    }
  }

  componentDidMount() {
    // GraphQL querie here to get data for this specific profile

  }

  render() {
    return (
      <div className="profile profile-page sidebar-collapse">
        <Header />
        <Main>
          <div className="page-header header-filter" id="background-profile" data-parallax="true"></div>
          <div className="main main-raised">
            <div className="profile-content">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 ml-auto mr-auto">
                    <div className="profile">
                      <div className="avatar">
                        <img src={this.state.profileImage} alt="Avatar" className="img-fluid" />
                      </div>
                      <div className="name">
                        <h3 id="profile-user-name" className="title"> </h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {this.state.suitcases.map((suitcase, i) => (
                    <SuitcaseCard
                      key={i}
                      city={suitcase.locale.locale_city}
                      localeAdmin={suitcase.locale.locale_admin}
                      country={suitcase.locale.locale_country}
                      src={suitcase.locale.locale_image} 
                      startDate={suitcase.start_date}
                      endDate={suitcase.end_date}
                      category={suitcase.category}
                    />
                  ))}

                  <div className="container col-sm-12 col-md-6 col-lg-4">
                    <div className="suitcaseCard suitcase-input" id="blank-suitcase" data-toggle="modal" data-target="#suitcase-modal">
                      <div className="card add-card text-white no-shadow">
                        <div className="suitcaseWrapper card-img">
                          <img className="suitcaseFrame img-responsive" src={SuitcaseFrame} alt="Suitcase Frame" />
                        </div>
                        <div className="card-img-overlay">
                          <i className="fa fa-plus plus-icon"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>


        </Main>
        <Footer />
      </div>
    )
  }
}

