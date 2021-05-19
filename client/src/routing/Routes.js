import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../components/layout/Alert';
import { Container } from 'reactstrap'
import NotFound from '../components/layout/NotFound';
import PrivateRoute from './PrivateRoute';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Dashboard from '../components/Dashboard/Dashboard'
import HospitalForm from '../components/Forms/HospitalProfileForm';
import Hospital from '../components/profile/Hospital';
import Navbar from '../components/layout/Navbar';

const Routes = props => {
    return (
        <>
            <Navbar />
            <Container>
                <Alert />
                <Switch>
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    <PrivateRoute exact path="/create-hospital-profile" component={() => <HospitalForm title="Create New Profile" />} />
                    <PrivateRoute exact path="/profile" component={Hospital} />
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </>
    );
};

export default Routes;
