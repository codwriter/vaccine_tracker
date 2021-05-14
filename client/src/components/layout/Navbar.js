import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,

  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from "reactstrap";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../redux/action/auth';
import logo from '../../assets/images/white_logo.png'



const NavbarComponent = ({ auth: { isAuthenticated }, logout }) => {
  const [isOpen, set_isOpen] = useState(false);
  const authLinks = (
    <>
      <NavItem>
        <Link to="/Profile" className="nav-link btn-magnify">Hospital</Link>
      </NavItem>
      <NavItem>
        <Link onClick={logout} className="nav-link btn-magnify" to="/">
          <i className="fas fa-sign-out-alt" />{' '}
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
    <Navbar light expand="md" className="bg-primary text-white navbar">
      <NavbarBrand href={isAuthenticated ? '/dashboard':'/'}>
        <img src={logo} className='nav-logo' />
      </NavbarBrand>


      <Link className="nav-link btn-magnify statistics" to="/Statistics">
        <div className="stats-fa">
          <i class="far fa-chart-bar fa-lg" />{' '}
          <span className="hide-sm">Statistics</span>
        </div>
      </Link>
   
      
      <UncontrolledDropdown  inNavbar >
        <DropdownToggle nav caret>
          <i class="far fa-user fa-lg"></i>
        </DropdownToggle>
        
        <DropdownMenu right>
          <DropdownItem>
            <Nav className="mr-auto" >
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Navbar>
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
