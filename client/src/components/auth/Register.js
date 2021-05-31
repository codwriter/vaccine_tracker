import React, { useState } from 'react';
import {
  Label,
  Button,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  FormText,
} from 'reactstrap';
import {
  AvForm,
  AvGroup,
  AvFeedback,
  AvInput,
} from 'availity-reactstrap-validation';
import { Row, Col } from 'reactstrap';


import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setAlert } from '../../redux/action/alert';
import { register } from '../../redux/action/auth';
import PropTypes from 'prop-types';
import Alert from '../layout/Alert';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    firstname: '',
    lastname: '',
    amkaUser: '',
    birthdate: '',
  });

  const {
    email,
    password,
    password2,
    firstname,
    lastname,
    amkaUser,
    birthdate,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register(formData);
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <AvForm className='form p-2' onValidSubmit={onSubmit}>
      <Alert />
      <Row>
        <Col>
          <AvGroup className='mb-3'>
            <Label className='text-muted'>Email</Label>
            <AvInput
              type='email'
              placeholder='Enter Email'
              name='email'
              value={email}
              onChange={onChange}
              required
            />
            <AvFeedback>Email is required!</AvFeedback>
          </AvGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <AvGroup className='mb-3'>
            <Label className='text-muted'>Password</Label>
            <AvInput
              type='password'
              placeholder='Your Password'
              name='password'
              onChange={onChange}
              required
            />
            <AvFeedback>
              The password is required and must be at least 6 characters!
            </AvFeedback>
          </AvGroup>
        </Col>
        <Col>
          <AvGroup className='mb-3'>
            <Label className='text-muted'>Retype Password</Label>
            <AvInput
              type='password'
              placeholder='Retype Your Password'
              name='password2'
              onChange={onChange}
              minLength="6"
              required
            />
            <AvFeedback>
              The password is required and must be at least 6 characters!
            </AvFeedback>
          </AvGroup>

        </Col>
      </Row>
      <hr />
      <FormText className='h6 mb-3'>User info</FormText>
      <Row>
        <Col>

          <AvGroup>
            <Label for='firstname'>Firstname:</Label>
            <AvInput
              type='text'
              placeholder='Firstname '
              name='firstname'
              onChange={onChange}
              required
            />
            <AvFeedback>
              The firstname name of the patient is required!
            </AvFeedback>
          </AvGroup>
        </Col>

        <Col>
          <AvGroup>
            <Label for='lastname'>Lastname:</Label>
            <AvInput
              type='text'
              placeholder='Lastname '
              name='lastname'
              onChange={onChange}
              required
            />
            <AvFeedback>
              The lastname name of the patient is required!
            </AvFeedback>
          </AvGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <AvGroup>
            <Label for='amkaUser'>AMKA:</Label>
            <AvInput
              type='text'
              id='amkaUser'
              placeholder='Amka'
              name='amkaUser'
              onChange={onChange}
              minLength='11'
              maxLength='11'
              pattern='^[0-9]+$'
              required
            />
            <AvFeedback>
              The AMKA is required and must be 11 numbers in length!
            </AvFeedback>
          </AvGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <AvGroup>
            <Label for='birthdate'>Birthdate:</Label>
            <AvInput
              type='date'
              id='birthdate'
              name='birthdate'
              onChange={onChange}
              className="custom-date"
              required
            />
            <AvFeedback>The Birthdate is required!</AvFeedback>
          </AvGroup>
        </Col>
      </Row>
      <AvGroup>
        <Button
          className='btn-primary btn-block d-block gap-2'
          round
          outline
          type='submit'
        >
          Sign Up
        </Button>
      </AvGroup>
    </AvForm>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
