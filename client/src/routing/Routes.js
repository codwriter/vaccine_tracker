import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../components/layout/Alert';
import NotFound from '../components/layout/NotFound';
import PrivateRoute from './PrivateRoute';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Dashboard from '../components/Dashboard'
import HospitalForm from '../components/Forms/HospitalProfileForm';

const Routes = props => {
    return (
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/create-hospital-profile" component={HospitalForm} />
                {/* <PrivateRoute exact path="/edit-profile" component={} /> */}
                {/* <PrivateRoute exact path="/add-experience" component={} /> */}
                {/* <PrivateRoute exact path="/add-education" component={} /> */}
                {/* <PrivateRoute exact path="/posts" component={} /> */}
                {/* <PrivateRoute exact path="/posts/:id" component={} /> */}
                <Route component={NotFound} />
            </Switch>
        </section>
    );
};

export default Routes;
