import React, { useState } from 'react';
import VaccineLogo from '../../assets/images/Vaccine-Tracker_logo.png';
import { Container, Row, Col, Card, CardImg, Button } from 'reactstrap';

import Alert from '../layout/Alert';
import Login from '../auth/Login';
import Register from '../auth/Register';
import useModal from '../Modals/useModal';
import RegisterModal from '../Modals/RegisterModal';

const Landing = () => {
  const { isShowing, toggle } = useModal();

  return (
    <div className='bg'>
      <Container fluid>
        <RegisterModal isShowing={isShowing} hide={toggle} />
        <Row>
          <Col>
            <img src={VaccineLogo} className='logo' />
          </Col>
          <Col>
            <Login />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Landing;
