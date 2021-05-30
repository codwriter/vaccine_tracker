import React, { useState } from 'react';
import VaccineLogo from '../../assets/images/Vaccine-Tracker_logo.png';
import { Container, Row, Col, Card, CardImg, Button } from 'reactstrap';

import Alert from '../layout/Alert';
import Login from '../auth/Login';
import useModal from '../Modals/useModal';
import RegisterModal from '../Modals/RegisterModal';

const Landing = () => {
  const { isShowing, toggle } = useModal();

  return (
    <Container fluid className='bg h-100'>
      <Alert/>
      <RegisterModal isShowing={isShowing} hide={toggle} />
      <Row className='h-100  justify-content-center'>
        <Col
          className='d-flex justify-content-md-end justify-content-lg-end justify-content-center  align-self-center'
          sm='12'
          md='4'
          lg='7'
        >
          <img src={VaccineLogo} width='65%' height='auto' />
        </Col>
        <Col
          sm='12'
          md='4'
          lg='5'
          className='d-flex align-self-center justify-content-md-start justify-content-lg-start justify-content-center'
        >
          <Login />
        </Col>
      </Row>
    </Container>

  );
};

export default Landing;
