import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Media } from 'reactstrap';
import VaccineLogo from '../../assets/images/Vaccine-Tracker_logo.png'
import { TabContent, TabPane, Nav, NavItem, NavLink, Button } from 'reactstrap';
import classnames from 'classnames';
import {
    FormGroup,
    Label,
    Input,
    FormText
  } from "reactstrap";
import Login from '../auth/Login';
import Register from '../auth/Register';
import { Card,  CardHeader, CardFooter, CardBody,
  CardTitle, CardText } from 'reactstrap';

const Landing = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
      if(activeTab !== tab) setActiveTab(tab);}

  return (
    <Container className="landing_margin">
      <Row>
        <Col sm="6"><Media object src={VaccineLogo} /></Col>
          
        <Col xs="6">
          <div>
            
            <Nav tabs>
              <Row>
                <Col>
                  <NavItem tag="h3" className="tab_button" >
                   <NavLink className={classnames({ active: activeTab === '1' })} onClick={() => { toggle('1'); }}>
                    Login
                   </NavLink>
                  </NavItem>
                </Col>
              </Row>

              <NavItem tag="h3" className="tab_button" >
                <NavLink className={classnames({ active: activeTab === '2' })} onClick={() => { toggle('2'); }}>
                  Register
                </NavLink>
              </NavItem >
            </Nav>
            
            
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row className="justify_center">
                  <Col sm="6">
                    <Login />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row className="justify_center">
                  <Col sm="6">
                  <Register />
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Landing;