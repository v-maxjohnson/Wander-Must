import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "../styles/ConfirmationModal.css";

export default class QuickViewModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };
  }

  toggle = () => {
    this.props.resetDeleteAccountConfirmationModal();
  }

  render() {
    return (
      <div>
        <Modal centered={true} isOpen={this.state.modal} toggle={this.toggle} className="confirmation-modal modal-md">
          <ModalHeader toggle={this.toggle}></ModalHeader>

          <ModalBody>
            <p>Are you absolutely sure you want to delete your account?<br />(this action cannot be undone)</p>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success btn-sm px-3 py-2 mr-1" onClick={() => {this.props.deleteUser() }} >Yes, delete it</button>
            <button className="btn btn-rose btn-sm px-3 py-2 ml-1" onClick={this.toggle}>No, cancel</button>
          </ModalFooter>
        </Modal >
      </div >
    );
  }
}

