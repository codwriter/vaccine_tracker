import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import PatientForm from '../Forms/PatientForm';
const reload = () => window.location.reload();
const PatientModal = ({ isShowing, hide, patient, title, }) => isShowing ? ReactDOM.createPortal(
  <>
    <div>
      <Modal isOpen={isShowing} onExit={reload} >
        <ModalHeader toggle={hide}>{title}</ModalHeader>
        <ModalBody>
          <PatientForm hide={hide} patient={patient} />
        </ModalBody>
      </Modal>
    </div>
  </>, document.body
) : null;

export default PatientModal;