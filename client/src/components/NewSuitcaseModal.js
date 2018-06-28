import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Moment from 'react-moment';
import "../styles/NewSuitcaseModal.css";

export default class NewSuitcaseModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };
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
                <input type="text" id="suitcase-city" className="form-control validate" />
                <label className="text-center" data-error="wrong" data-success="right" htmlFor="suitcase-city">City</label>
              </div>
            </div>
            <div className="col-6">
              <div className="md-form mb-5">
                <i className="fa fa-plane prefix"></i>
                <select className="custom-select" id="travelselect">
                  <option value="" disabled="disabled" selected></option>
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
                  <input type='text' id="start-date" className="form-control datepicker" />

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
                  <input type='text' id="end-date" className="form-control datepicker"/>
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