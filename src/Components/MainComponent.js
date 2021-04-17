import  Alert  from '../layout/Alert';
import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Routes from '../routing/Routes';

class Main extends Component {

    render() {
        return (
        <div className="App">
                <Header />
                <Alert/>
            <Switch>
                    <Route exact path="/" component={Home} />
                    <Route component={Routes} />
            </Switch>
            <Footer />
        </div>
 );
    }
}

export default withRouter((Main));