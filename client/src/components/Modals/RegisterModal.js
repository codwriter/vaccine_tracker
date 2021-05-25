import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Register from '../auth/Register';
const RegisterModal = ({ isShowing, hide }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div>
            <Modal isOpen={isShowing}>
              <ModalHeader toggle={hide}></ModalHeader>
              <ModalBody>
                <Register hide={hide} />
              </ModalBody>
            </Modal>
          </div>
        </>,
        document.body
      )
    : null;

export default RegisterModal;
