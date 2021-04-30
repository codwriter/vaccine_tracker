import React, { useState } from 'react';

import {
  Form,
  FormGroup,
  Label,
  Button,
  Input,
} from 'reactstrap';

import {
  Card, 
  CardBody, 
  CardTitle, 
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
          <CardTitle tag="h2">Sign In</CardTitle>

          <br></br>

          <CardSubtitle tag="h6" className="mb-2 text-muted">
            <i className="fas fa-user" />   Sign Into Your Account
          </CardSubtitle>
        
          <br></br>

          <FormGroup>
            <Label className="text-muted">Email address</Label>
            <Input
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label className="text-muted">Password</Label>
            <Input
              type="password"
              placeholder="Your Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
            />
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