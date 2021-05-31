import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavbarToggler,
  Row,
  Col
} from "reactstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/action/auth';
import logo from '../../assets/images/white_logo.png'
import { Fragment } from 'react';


const NavbarComponent = ({ auth: { isAuthenticated }, logout }) => {
  const [isOpen, set_isOpen] = useState(false);

  const authLinks = (
    <>
      <NavItem>
        <Link to="/profile" className="nav-link btn-magnify"><i className="fas fa-hospital-user mr-2"></i>Hospital</Link>
      </NavItem>
      <NavItem>
        <Link onClick={logout} className="nav-link btn-magnify" to="/">
          <i className="fas fa-sign-out-alt mr-2" />{' '}
          <span className="hide-sm">Logout</span>
        </Link>
      </NavItem>
    </>
  );

  const guestLinks = (
    <>

    </>
  );

  const toggle = () => set_isOpen(!isOpen);

  return (
    <Fragment>  
      <Navbar light expand="md" className="bg-primary text-white navbar">
        <NavbarBrand href={isAuthenticated ? '/dashboard' : '/'}>
          <img src={logo} alt="logo" className='nav-logo' />
        </NavbarBrand>
        
        <NavbarToggler onClick={toggle} />
        
        <Collapse isOpen={isOpen} navbar>
          <Link className="nav-link btn-magnify navbar-links ml-auto" to="/dashboard">
            <i className="nc-icon nc-layout-11"></i>{' '}
            <span className="hide-sm">Dashboard</span>
          </Link>
  
          <Link className="nav-link btn-magnify navbar-links" to="/statistics">
            <i className="far fa-chart-bar fa-lg" />{' '}
            <span className="hide-sm">Statistics</span>
          </Link>

          <UncontrolledDropdown inNavbar className="nikos">
            <DropdownToggle nav caret>
              <i className="far fa-user fa-lg"></i>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Nav className="mr-auto" >
                  {isAuthenticated ? authLinks : guestLinks}
                </Nav>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Collapse>
      </Navbar>
    </Fragment>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavbarComponent);
