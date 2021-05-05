import React, { useState } from 'react';

import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from 'reactstrap';

import {
  Card, 
  CardBody,
  CardSubtitle
} from 'reactstrap';

import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../redux/action/alert';
import { register } from '../../redux/action/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: ''
  });

  const { email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Form onSubmit={onSubmit}>
      <Card>
        <CardBody>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            <i className="fas fa-user" />   Create Your Account
          </CardSubtitle>

          <br></br>

          <FormGroup className="mb-3">
            <Label className="text-muted">Email</Label>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i class="fas fa-envelope"></i> 
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={onChange}
              />
            </InputGroup>
          </FormGroup>

          <FormGroup className="mb-3">
            <Label className="text-muted">Password</Label>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i class="fas fa-key"></i> 
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="password"
                placeholder="Your Password"
                name="password"
                value={password}
                onChange={onChange}
              />
            </InputGroup>
          </FormGroup>

          <FormGroup className="mb-3">
            <Label className="text-muted">Retype Password</Label>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i class="fas fa-key"></i> 
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="password"
                placeholder="Retype Your Password"
                name="password2"
                value={password2}
                onChange={onChange}
              />
            </InputGroup>

          </FormGroup>

          <Button color="secondary" round outline type="submit">
            Sign Up
          </Button>

         {/*  <div className="my-3">
            Already have an account? <Link to="/login">Sign In</Link>
          </div> */}
        </CardBody>
      </Card>
    </Form>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);