import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../redux/action/alert';
//import { register } from '../redux/action/auth';
import PropTypes from 'prop-types';
import { register } from '../authentic/auth';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false

        };
    }

    handleChange = (name) => (event) => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });

    };

    clickSubmit = event => {
        event.preventDefault()
        const { email, password, password2 } = this.state
        const user = {
            email,
            password,
            password2
        };

        register(user).then(data => {
            if (data.error) this.setState({ error: data.error });
            else this.setState({
                error: "",
                email: "",
                password: "",
                password2: "",
                open: true
            });
        });
    };

    registerForm = (email, password, password2) => (
        <form>
            <body class="text-center">
                <div className="form-group">
                    <div class="col-sm-8 my-1 mx-auto text-left">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")}
                            type="email"
                            placeholder="Your Email"
                            className="form-control"
                            value={email}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <div class="col-sm-8 my-1 mx-auto text-left">
                        <label className="text-muted">Password</label>
                        <input
                            onChange={this.handleChange("password")}
                            type="password"
                            placeholder="Your Password"
                            className="form-control"
                            value={password}
                        />
                        <small id="passwordHelpBlock" class="form-text text-muted">
                            Your password must be minimum 5 characters.
                        </small>
                    </div>
                </div>

                <div className="form-group">
                    <div class="col-sm-8 my-1 mx-auto text-left">
                        <label className="text-muted">Confirm Password</label>
                        <input
                            onChange={this.handleChange("password2")}
                            type="password"
                            placeholder="Confirm Your Password"
                            className="form-control"
                            value={password2}
                        />
                        <small id="passwordHelpBlock" class="form-text text-muted">
                            Your password must be minimum 5 characters.
                        </small>
                    </div>
                </div>

                <div className="form-group">
                    <div class="col-sm-8 my-1 mx-auto text-left">
                        <button onClick={this.clickSubmit} className="btn btn-raised btn-dark">
                            Sign Up
                        </button>
                    </div>
                </div>

                <br></br>

                <div className="form-group">
                    <div class="col-sm-8 my-1 mx-auto text-left">
                        Already have an account? {" "} <Link to="/login">Sign In</Link>
                    </div>
                </div>
            </body>
        </form>
    )
    render() {
        const { email, password, password2, error, open } = this.state;
        return (
            <body >
                <div className="container text-secondary">

                    <div className="form-group">
                        <div class="col-sm-8 my-1 mx-auto text-left">
                            <h2 className="mt-5 mb-5">Sign Up</h2>
                            <h4 className="mt-5 mb-5"><i className="fas fa-user" ></i>     Create Your Account</h4>
                        </div>
                    </div>

                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>

                    <div
                        className="alert alert-info"
                        style={{ display: open ? "" : "none" }}
                    >
                        New account is successfully created! Please {" "} <Link to="/signin">Sign In</Link>.

                    </div>

                    {this.registerForm(email, password, password2)}

                </div>

            </body>
        );
    };
};

export default Register;