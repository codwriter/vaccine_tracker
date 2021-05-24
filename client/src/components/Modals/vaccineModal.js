import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import VaccineForm from '../Forms/VaccineForm';
const VaccineModal = ({ isShowing, hide, vaccine, title, }) => isShowing ? ReactDOM.createPortal(
    <>
        <div>
            <Modal isOpen={isShowing} size="lg">
                <ModalHeader toggle={hide}>{title}</ModalHeader>
                <ModalBody>
                    <VaccineForm hide={hide} vaccine={vaccine} />
                </ModalBody>
            </Modal>
        </div>
    </>, document.body
) : null;

export default VaccineModal;