import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PatientForm from '../Forms/PatientForm';
const PatientModal = ({ isShowing, hide, patient, title, }) => isShowing ? ReactDOM.createPortal(
  <>
    <div>
      <Modal isOpen={isShowing} size="lg">
        <ModalHeader toggle={hide}>{title}</ModalHeader>
        <ModalBody>
          <PatientForm hide={hide} patient={patient} />
        </ModalBody>
      </Modal>
    </div>
  </>, document.body
) : null;

export default PatientModal;