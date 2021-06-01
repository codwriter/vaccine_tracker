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
              <p className='user-select-none mb-1 text-accent'>
                  <i className='mr-2 fas fa-user' />
                  Create Your Account
                </p>
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
