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

import { login } from '../../redux/action/auth';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  
  return (
    <Form onSubmit={onSubmit}>
      <Card>
        <CardBody>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            <i className="fas fa-user" />   Sign Into Your Account
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
                required
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
                minLength="6"
              />
            </InputGroup>
          </FormGroup>

          <Button color="secondary" round outline type="submit">
            Sign In
          </Button>

          <div className="my-3">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </div>
        </CardBody>
      </Card>
    </Form>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);