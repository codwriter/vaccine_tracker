import React, { useState } from 'react';
import {
  Label,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from 'reactstrap';
import {
  Button,
  Row,
  Col,
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvFeedback,
  AvInput,
} from 'availity-reactstrap-validation';
import { Card, CardBody, CardSubtitle } from 'reactstrap';
import { login } from '../../redux/action/auth';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import useModal from '../Modals/useModal';
import RegisterModal from '../Modals/RegisterModal';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { isShowing, toggle } = useModal();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <RegisterModal isShowing={isShowing} hide={toggle} />
      <AvForm onValidSubmit={onSubmit} className='w-75 mr-5 ml-5'>
        <Card className='p-4'>
          <CardBody>
            <CardSubtitle tag='h6' className='mb-2 text-muted'>
              <i className='fas fa-user' /> Sign Into Your Account
          </CardSubtitle>
            <br></br>
            <AvGroup className='mb-3'>
              <Label className='text-muted'>Email</Label>
              <InputGroup className='input-group-alternative'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <i class=' mr-2 fas fa-envelope'></i>
                  </InputGroupText>
                </InputGroupAddon>
                <AvInput
                  type='email'
                  placeholder='Enter Email'
                  name='email'
                  value={email}
                  onChange={onChange}
                  required
                />
              </InputGroup>
              <AvFeedback>Email is required!</AvFeedback>
            </AvGroup>
            <AvGroup className='mb-3'>
              <Label className='text-muted'>Password</Label>
              <InputGroup className='input-group-alternative'>
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>
                    <i class=' mr-2 fas fa-key'></i>
                  </InputGroupText>
                </InputGroupAddon>
                <AvInput
                  type='password'
                  placeholder='Your Password'
                  name='password'
                  value={password}
                  onChange={onChange}
                  minLength='6'
                />
              </InputGroup>
              <AvFeedback>Password is required!</AvFeedback>
            </AvGroup>

            <Row>
              <Col>
                <Button
                  className='btn-primary btn-block d-block gap-2'
                  round
                  outline
                  type='submit'
                >
                  Sign In
              </Button>
              </Col>
            </Row>
            <hr className='w-50' />
            <Row>
              <Col>
                <Button
                  className='btn-outline-primary btn-block d-block gap-2'
                  onClick={toggle}
                >

                  Create New Account
              </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </AvForm>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
