/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "../../assets/images/logo_vaccine.png";

var ps;

class Sidebar extends React.Component {

  
  render() {
    return (
      <div
        className="sidebar" data-color="white"
        data-active-color="info"
      >
        <div className="logo">
          <a
            href="/"
            className="simple-text logo-mini"
          >
            <div className="logo-img">
              <img src={logo} alt="react-logo" />
            </div>
          </a>
       
        </div>
        <div className="sidebar-wrapper" ref={this.sidebar}>
          <Nav>
           <li>Add Patient</li>
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
