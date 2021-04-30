import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../components/layout/Alert';
import NotFound from '../components/layout/NotFound';
import PrivateRoute from './PrivateRoute';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Dashboard from '../components/Dashboard'
import HospitalForm from '../components/Forms/HospitalProfileForm';
import Hospital from '../components/profile/Hospital';
const Routes = props => {
    return (
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/create-hospital-profile" component={() => <HospitalForm title="Create New Profile"/>}  />
                <PrivateRoute exact path="/profile" component={Hospital} />
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
