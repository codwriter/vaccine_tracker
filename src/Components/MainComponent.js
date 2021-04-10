import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';

class Main extends Component {

    render() {
        return (
        <div className="App">
            <Header />
            <Switch>
                    <Route path="/home" component={Home} />
                    <Redirect to="/home" />
            </Switch>
            <Footer />
        </div>
 );
    }
}

export default withRouter((Main));