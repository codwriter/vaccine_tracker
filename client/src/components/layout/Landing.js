import React, { useState } from 'react';
import VaccineLogo from '../../assets/images/Vaccine-Tracker_logo.png';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Container, Row, Col, Card,
  CardImg,
} from 'reactstrap';
import classnames from 'classnames';
import Login from '../auth/Login';
import Register from '../auth/Register';


const Landing = () => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Container className='landing_margin'>
      <Row>
        <Col>
          <Card>
            <Row>
              <CardImg src={VaccineLogo} />
            </Row>
          </Card>
        </Col>

        <Col xs='6'>
          <Card>
            <Nav tabs className='loginRegister'>
              <Row>
                <Col>
                  <NavItem tag='h3' className='tab_button'>
                    <NavLink
                      className={classnames({ active: activeTab === '1' })}
                      onClick={() => {
                        toggle('1');
                      }}
                    >
                      Login
                    </NavLink>
                  </NavItem>
                </Col>
              </Row>

              <NavItem tag='h3' className='tab_button'>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => {
                    toggle('2');
                  }}
                >
                  Register
                </NavLink>
              </NavItem>
            </Nav>
          </Card>

          <TabContent activeTab={activeTab}>
            <TabPane tabId='1'>
              <Row className='justify_center'>
                <Col>
                  <Login />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId='2'>
              <Row className='justify_center'>
                <Col>
                  <Register />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Col>
      </Row>
    </Container>
  );
};

export default Landing;
