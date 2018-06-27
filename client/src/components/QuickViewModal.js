import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class QuickViewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };
  }

  toggle = () => {
    this.props.resetQuickViewModal();
  }

  render() {
    return (
      <div>
        <Modal centered={true} isOpen={this.state.modal} toggle={this.toggle} className="modal-lg">
          <ModalHeader toggle={this.toggle}>{this.props.quickViewData.User.username} {this.props.quickViewData.User.gender} {this.props.quickViewData.Locale.locale_city}</ModalHeader>
          <ModalBody>
            <div className="row">
              Body
            </div>
          </ModalBody>
          <ModalFooter>
          <button className="btn btn-primary btn-sm px-3 py-2" onClick={this.toggle}>Close</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
