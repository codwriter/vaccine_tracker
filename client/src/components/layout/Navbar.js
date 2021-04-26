import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar as navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/action/auth';
import logo from '../../assets/images/logo_vaccine.png'



const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const [isOpen, set_isOpen] = useState(false);
  const authLinks = (
    <>
      <NavItem>
        <Link to="/dashboard" className="nav-link btn-magnify">Dashboard</Link></NavItem>
      <NavItem>
        <Link to="/Profile" className="nav-link btn-magnify">Hospital</Link></NavItem>
      <NavItem>
        <a onClick={logout} className="nav-link btn-magnify" href="/">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </NavItem>
    </>
  );

  const guestLinks = (
    <>
      <NavItem>
        <Link to="/register" className="nav-link btn-magnify">Register</Link>
      </NavItem>
      <NavItem>
        <Link to="/login" className="nav-link btn-magnify">Login</Link>
      </NavItem>
    </>
  );

  return (
      <navbar className="bg-primary text-white navbar ">
          <NavbarBrand href="/"><img src={logo} className='nav-logo' /></NavbarBrand>
    <div className="navbar-wrapper">
          <Nav >{isAuthenticated ? authLinks : guestLinks}</Nav></div>
      </navbar>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);