import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../layout/Alert';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';


const Routes = props => {
    return (
        <section className="container">
            <Alert />
            <Switch>
                {/* <Route exact path="/register" component={} /> */}
                {/* <Route exact path="/login" component={} /> */}
                {/* <PrivateRoute exact path="/dashboard" component={} /> */}
                {/* <PrivateRoute exact path="/create-profile" component={} /> */}
                {/* <PrivateRoute exact path="/edit-profile" component={} /> */}
                {/* <PrivateRoute exact path="/add-experience" component={} /> */}
                {/* <PrivateRoute exact path="/add-education" component={} /> */}
                {/* <PrivateRoute exact path="/posts" component={} /> */}
                {/* <PrivateRoute exact path="/posts/:id" component={} /> */}
                {/* <Route component={NotFound} /> */}
            </Switch>
        </section>
    );
};

export default Routes;
