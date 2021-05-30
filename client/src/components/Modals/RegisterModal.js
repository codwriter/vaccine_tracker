import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Register from '../auth/Register';
const RegisterModal = ({ isShowing, hide }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div>
            <Modal isOpen={isShowing} size='lg'>
              <ModalHeader toggle={hide}>
                <h7 className='mb-2 text-accent'>
                  <i className='mr-1 fas fa-user' />
                  Create Your Account
                </h7>
              </ModalHeader>
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
