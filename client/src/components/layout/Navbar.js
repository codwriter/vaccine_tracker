import React, {useState } from 'react';
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  NavLink,
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
      <NavItem >
        <Link to="/dashboard" className="nav-link btn-magnify">Dashboard</Link>
      </NavItem>
      <NavItem>
        <Link to="/Profile" className="nav-link btn-magnify">Hospital</Link>
      </NavItem>
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
    
    </>
  );

  const toggle = () => set_isOpen(!isOpen);

  return (
    <div>
      <Navbar light expand="md" className="bg-primary text-white navbar">
      <NavbarBrand href={isAuthenticated ? '/dashboard':'/'}>
        <img src={logo} className='nav-logo' />
      </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav>
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Collapse>
      </Navbar>
    </div>

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
