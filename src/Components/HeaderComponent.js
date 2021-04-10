import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody, FormGroup, Form, Label, Input
} from 'reactstrap';
import { NavLink } from 'react-router-dom';


class Header extends Component {
    constructor(props) {
    }
    render() {
        return (
            < React.Fragment >
                <Navbar dark expand="md" >
                    <Navbar dark color="primary">
                        <div className="container">
                            <NavbarBrand href="/">Vaccine Tracker</NavbarBrand>
                        </div>
                    </Navbar>
                </Navbar>
            </React.Fragment >
        );
    }
}