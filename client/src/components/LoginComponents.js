import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { login, authenticate } from '../authentic/auth';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirect: false,
            loading: false
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })
        const { email, password } = this.state;
        const user = {
            email,
            password
        };

        console.log(user);
        login(user)
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        this.setState({ redirect: true })
                    })

                }
            });
    };

    loginForm = (email, password) => (
        <form>
            <body class="text-center">
                <div className="form-group">
                    <div class="col-sm-8 my-1 mx-auto text-left">
                        <label className="text-muted">Email</label>
                        <input
                            onChange={this.handleChange("email")}
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
                    </div>
                </div>

                <div className="form-group">
                    <div class="col-sm-8 my-1 mx-auto text-left">
                        <button onClick={this.clickSubmit} className="btn btn-raised btn-dark ">
                            Sign In
                        </button>
                    </div>
                </div>

                <br></br>

                <div className="form-group">
                    <div class="col-sm-8 my-1 mx-auto text-left">
                        Don't have an account? {" "} <Link to="/register">Sign Up</Link>
                    </div>
                </div>
            </body>
        </form>
    );

    render() {
        const { email, password, error, redirect, loading } = this.state;

        if (redirect) {
            return <Redirect to="/home" />
        }

        return (
            <body class="text-center">
                <div className="container text-secondary">
                    <div className="form-group">
                        <div class="col-sm-8 my-1 mx-auto text-left">
                            <h2 className="mt-5 mb-5" >Sign In</h2>
                            <h4 className="mt-5 mb-5" ><i className="fas fa-user" ></i>     Sign into Your Account</h4>

                        </div>
                    </div>

                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}                     >
                        {error}
                    </div>

                    {loading ? (
                        <div className="jumbotron text-center">
                            <h2>Loading...</h2>
                        </div>
                    ) : (
                        ""
                    )}

                    {this.loginForm(email, password)}

                </div>
            </body>
        );
    }
}

export default Login;