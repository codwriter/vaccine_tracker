import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
    Button, Modal, ModalHeader, ModalBody, FormGroup, Form, Label, Input
} from 'reactstrap';
import { NavLink } from 'react-router-dom';


class Header extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment >
                    <Navbar dark expand="md" color="primary">
                        <div className="container">
                            <NavbarBrand href="/">Vaccine Tracker</NavbarBrand>
                        </div>
                    </Navbar>
            </React.Fragment >
        );
    }
}
export default Header;