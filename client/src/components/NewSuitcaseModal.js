import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import Search from "../pages/Search";
import Autocomplete from 'react-google-autocomplete';
import DatePicker from 'react-datepicker';
import Pixabay from '../utils/Pixabay';
import moment from 'moment';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "../styles/NewSuitcaseModal.css";
import 'react-datepicker/dist/react-datepicker.css';
import gql from "graphql-tag";
import ApolloClient from 'apollo-boost';
import validate from 'validate.js'

const CREATE_NEW_LOCALE_MUTATION = gql` 
mutation createNewLocale( $locale_city: String!, $locale_admin: String!, $locale_country: String! ){
    createNewLocale(locale_city: $locale_city, locale_admin: $locale_admin, locale_country: $locale_country) {
      id
    }
}`;

const CREATE_NEW_SUITCASE_MUTATION = gql` 
mutation createNewSuitcase( $start_date: String!, $end_date: String!, $travel_category: String!, $user_id: ID, $locale_id: ID, $suitcase_image: String! ){
    createNewSuitcase(start_date: $start_date, end_date: $end_date, travel_category: $travel_category, user_id: $user_id, locale_id: $locale_id, suitcase_image: $suitcase_image ) {
      id
    }
}`;

const client = new ApolloClient();

let locationArray = [];
let tempArray = [];

export default class NewSuitcaseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      startDate: moment(),
      endDate: moment(),
      startSelect: null,
      endSelect: null,
      newLocale: null,
      selectValue: "",
      cityImageSrc: "",
      loggedInUserId: localStorage.getItem("logged_in_user_id"),
      newLocaleError: "",
      selectValueError: "",
      minDateError: "",
      endDateError: ""
    };
    this.constraints = {
      newLocale: {
        presence: {
          presence: true,
          message: "must be verified"
        }
      },
      selectValue : {
        presence: {
          allowEmpty: false
        }
      },
      minDate: {
        presence: true
      },
      endDate: {
        presence: true
      }
    }
  }

  submitForm = event => {

    let data = {
      newLocale: this.state.newLocale,
      selectValue : this.state.selectValue,
      minDate: this.state.startSelect,
      endDate: this.state.endSelect 

    }

    let result = validate(data, this.constraints)
    if (result) {
      if (result.newLocale) {
        this.setState({newLocaleError: result.newLocale[0]});
      }
      if (result.selectValue) {
        this.setState({selectValueError: result.selectValue[0]});
      }
      if (result.minDate) {
        this.setState({minDateError: result.minDate[0]})
      }
      if (result.endDate) {
        this.setState({endDateError: result.endDate[0]})
      }
    }
  }


  handleStartChange = (startDate) => {
    this.setState({
      startDate: startDate,
      minDateError: ""
    });
  }

  handleEndChange = (endDate) => {
    this.setState({
      endDate: endDate,
      endDateError: ""
    });
  }

  handleStartSelect = (startDate) => {
    this.setState({
      startSelect: startDate,
      minDateError: ""
    });
  }

  handleEndSelect = (endDate) => {
    this.setState({
      endSelect: endDate,
      endDateError: ""
    });
  }

  handleSelectChange = (event) => {
    this.setState({
      selectValue: event.target.value,
      selectValueError: ""
    });
  }

  handleNewLocale = (place) => {
    
    if (place !== "") {
      place = place.replace(/\s+-\s+/g, ', ');
      place = place.replace(/\s+/g, '_');
      place = place.toLowerCase();

      locationArray = place.split(",_");

      // if the location is in australia, there is no delimiter between city and state except a space, so it enters as one value. split that value into 2 and create a location array that matches the other formatting 
      if (locationArray[locationArray.length - 1] === "australia") {
        // locationArray[2] = tempArray[2];
        tempArray = locationArray[0].split("_");
        locationArray[0] = tempArray[0];
        locationArray[1] = tempArray[1];
        locationArray[2] = "australia";
      }

      let newLocaleObject = {};

      // logic to handle how different countries list their cities on google and make sure data formatting is consistent and create locale object
      if (locationArray.length === 3) {
        newLocaleObject = {
          locale_city: locationArray[0],
          locale_admin: locationArray[1],
          locale_country: locationArray[2]
        };
      } else if (locationArray.length > 3) {
        newLocaleObject = {
          locale_city: locationArray[0],
          locale_admin: locationArray[locationArray.length - 2],
          locale_country: locationArray[locationArray.length - 1]
        };
      } else {
        newLocaleObject = {
          locale_city: locationArray[0],
          locale_admin: locationArray[1],
          locale_country: locationArray[1]
        };
      }

      this.setState({
        newLocale: newLocaleObject,
        locationChosen: true
      });
    }
    this.setState({newLocaleError: ""})
  }

  createNewLocale = () => {
    client.mutate({
      mutation: CREATE_NEW_LOCALE_MUTATION,
      variables: { locale_city: this.state.newLocale.locale_city, locale_admin: this.state.newLocale.locale_admin, locale_country: this.state.newLocale.locale_country }
    }).then(result => {
      this.createNewSuitcase(result.data.createNewLocale.id);
    }).catch(err => console.log(err))

  }

  createNewSuitcase = (localeId) => {
    client.mutate({
      mutation: CREATE_NEW_SUITCASE_MUTATION,
      variables: { start_date: this.state.startSelect.format('YYYY-MM-DD'), end_date: this.state.endSelect.format('YYYY-MM-DD'), travel_category: this.state.selectValue, user_id: this.state.loggedInUserId, locale_id: localeId, suitcase_image: this.state.cityImageSrc }
    }).then(result => {
      localStorage.setItem("suitcase_id", result.data.createNewSuitcase.id);
      this.props.resetNewSuitcaseModal();
    }).then(this.setState({
      shouldRedirectToCity: true
    }))
    .catch(err => console.log(err))
  }

  maybeRedirect = () => {
    if (this.state.shouldRedirectToCity) {
      return (
        <Redirect to={"/search/" + this.state.newLocale.locale_city} render={(props) => <Search {...props} />} />
      )
    }
  }

  renderPixabay = () => {
    if (this.state.locationChosen) {
      return <Pixabay
        city={this.state.newLocale.locale_city}
        country={this.state.newLocale.locale_country}
        setCityImageSrc={this.setCityImageSrc}
      />
    }
  }

  setCityImageSrc = (url) => {
    this.setState({ cityImageSrc: url })
    console.log(this.state.cityImageSrc)
  }

  toggle = () => {
    this.props.resetNewSuitcaseModal();
  }

  render() {
    console.log(this.state);
    return (
      <div>
        {this.maybeRedirect()}
        {this.renderPixabay()}
        <Modal centered={true} isOpen={this.state.modal} toggle={this.toggle} className="new-suitcase-modal modal-lg">
          <ModalHeader toggle={this.toggle}><strong>Add a new suitcase</strong></ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-6">
                <div className="md-form mb-5">
                  <i className="fa fa-map-marker prefix"></i>
                  <Autocomplete
                    ref={r => this.autoInput = r}
                    className="form-control"
                    style={{ width: '90%' }}
                    onPlaceSelected={(place) => {
                      this.handleNewLocale(this.autoInput.refs.input.value)
                    }}
                    onChange={this.newLocaleError}
                    types={['(cities)']}
                  />
                  <label className="text-center" data-error="wrong" data-success="right" htmlFor="suitcase-city">City</label>
                </div>
                <p className="modal-error-text">{this.state.newLocaleError}</p>
              </div>
              <div className="col-6">
                <div className="md-form mb-5">
                  <i className="fa fa-plane prefix"></i>
                  <select
                    className="custom-select"
                    id="travelselect"
                    onChange={this.handleSelectChange}
                    ref={ref => {
                      this.select = ref
                    }}
                    defaultValue={this.state.selectValue}
                  >
                    <option value="" disabled="disabled"></option>
                    <option value="business">Business</option>
                    <option value="leisure">Leisure</option>
                    <option value="adventure">Adventure</option>
                    <option value="vacation">Vacation</option>
                  </select>
                  <label data-error="wrong" data-success="right" htmlFor="travelselect">Travel Type</label>
                </div>
                <p className="modal-error-text">{this.state.selectValueError}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <div className="md-form mb-5">
                  <div className='input-group date' id='datetimepicker1'>
                    <span className="input-group-addon" id="pickOne">
                      <i className="fa fa-calendar mr-2"></i>
                    </span>
                    <DatePicker className="form-control datepicker"
                      selected={this.state.startSelect}
                      onSelect={this.handleStartSelect}
                      onChange={this.handleStartChange}
                    />
                  </div>
                  <label data-error="wrong" data-success="right" htmlFor="start-date">Start Date</label>
                </div>
                <p className="modal-error-text">{this.state.minDateError}</p>
              </div>

              <div className="col-6">
                <div className="md-form mb-5">
                  <div className='input-group date' id='datetimepicker2'>
                    <span className="input-group-addon" id="pickTwo">
                      <i className="fa fa-calendar mr-2"></i>
                    </span>
                    <DatePicker className="form-control datepicker"
                      minDate={this.state.startDate}
                      selected={this.state.endSelect}
                      onSelect={this.handleEndSelect}
                      onChange={this.handleEndChange}
                    />
                  </div>
                  <label data-error="wrong" data-success="right" htmlFor="end-date">End Date</label>
                </div>
                <p className="modal-error-text">{this.state.endDateError}</p>
              </div>
            </div>

          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary btn-sm px-3 py-2" onClick={() => this.createNewLocale()} onClick={this.submitForm}>Start Packing!</button>
          </ModalFooter>
        </Modal >
      </div >
    );
  }
}