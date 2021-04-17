import  Alert  from './Alert';
import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Footer from './FooterComponent';
import Header from './HeaderComponent';
import Home from './HomeComponent';
import Register from './RegisterComponents';
import Login from './LoginComponents';

class Main extends Component {

    render() {
        return (
        <div className="App">
            <Header />
            <Alert/>
            <Switch>

                <Route path="/home" component={Home} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                
            </Switch>
            <Footer />
        </div>
 );
    }
}

export default withRouter((Main));