import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "../styles/NewSuitcaseModal.css";
import 'react-datepicker/dist/react-datepicker.css';

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
      newLocale: null
    };
  }

  handleStartChange = (startDate) => {
    this.setState({
      startDate: startDate
    });
  }

  handleEndChange = (endDate) => {
    this.setState({
      endDate: endDate
    });
  }

  handleStartSelect = (startDate) => {
    this.setState({
      startSelect: startDate
    });
  }

  handleEndSelect = (endDate) => {
    this.setState({
      endSelect: endDate
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
        newLocale: newLocaleObject
      });
    }
  }

  toggle = () => {
    this.props.resetNewSuitcaseModal();
  }

  render() {
    return (
      <div>
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
                      console.log(place);
                      this.handleNewLocale(this.autoInput.refs.input.value)
                    }}
                    types={['(cities)']}
                  />
                  <label className="text-center" data-error="wrong" data-success="right" htmlFor="suitcase-city">City</label>
                </div>
              </div>
              <div className="col-6">
                <div className="md-form mb-5">
                  <i className="fa fa-plane prefix"></i>
                  <select className="custom-select" id="travelselect">
                    <option value="" disabled="disabled"></option>
                    <option value="business">Business</option>
                    <option value="leisure">Leisure</option>
                    <option value="adventure">Adventure</option>
                    <option value="vacation">Vacation</option>
                  </select>
                  <label data-error="wrong" data-success="right" htmlFor="travelselect">Travel Type</label>
                </div>
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
              </div>
            </div>

          </ModalBody>
          <ModalFooter>
            <button className="btn btn-primary btn-sm px-3 py-2">Start Packing!</button>
          </ModalFooter>
        </Modal >
      </div >
    );
  }
}