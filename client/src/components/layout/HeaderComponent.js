import React, { Component ,Fragment} from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
    Button, Modal, ModalHeader, ModalBody, FormGroup, Form, Label, Input
} from 'reactstrap';
import { Link } from 'react-router-dom';


class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment >
                    <Navbar  dark expand="md" color="primary">
                       
                    </Navbar>
            </Fragment >
        );
    }
}
export default Header;