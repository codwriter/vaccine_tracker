import React, { useState } from 'react';
import VaccineLogo from '../../assets/images/Vaccine-Tracker_logo.png';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Container, Row, Col, Card,
  CardImg,
} from 'reactstrap';
import classnames from 'classnames';
import Alert from '../layout/Alert';
import Login from '../auth/Login';
import Register from '../auth/Register';


const Landing = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="container-fluid w-100">
      <div className="row">
        <div className="col-sm"><div className="d-flex justify-content-center "><img src={VaccineLogo} width="45%" /></div></div>
        <div className="col-sm">
          <Login /></div>
      </div>







    </div>
  );
};

export default Landing;
