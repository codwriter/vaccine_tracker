import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PatientForm from '../Forms/PatientForm';

const PatientModal = ({ isShowing, hide, patient ,title}) => isShowing ? ReactDOM.createPortal(
    <>
    <div>
      <Modal isOpen={isShowing} >
        <ModalHeader toggle={hide}>{title}</ModalHeader>
        <ModalBody>
          <PatientForm patient={patient} />
        </ModalBody>
      </Modal>
      </div>
      </>, document.body
) : null;

export default PatientModal;